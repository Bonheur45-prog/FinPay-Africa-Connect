import { cloudinary } from '../config/cloudinary.js';
import Blog from '../models/Blog.js';
import { sendSuccess, sendError } from '../utils/response.js';

const uploadToCloudinary = (buffer, folder = 'finpay-blogs') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

export const listBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status = 'published',
      featured,
      search,
      sort = '-publishedAt'
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';
    if (search) query.$text = { $search: search };

    if (!req.user || req.user.role !== 'admin') {
      query.status = 'published';
    } else if (status !== 'all') {
      query.status = status;
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
      select: req.user?.role === 'admin' ? '' : '-seoTitle -seoDescription -seoKeywords'
    };

    const blogs = await Blog.paginate(query, options);

    return sendSuccess(res, 200, 'Blogs fetched successfully', {
      blogs: blogs.docs,
      pagination: {
        page: blogs.page,
        pages: blogs.totalPages,
        total: blogs.totalDocs,
        limit: blogs.limit
      }
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const getBlogCategories = async (_req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    return sendSuccess(res, 200, 'Categories fetched successfully', {
      categories: categories.map((cat) => ({ name: cat._id, count: cat.count }))
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return sendError(res, 404, 'Blog not found.');
    }

    if (blog.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return sendError(res, 404, 'Blog not found.');
    }

    if (blog.status === 'published') {
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
      blog.views += 1;
    }

    return sendSuccess(res, 200, 'Blog fetched successfully', { blog });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const createBlog = async (req, res) => {
  try {
    const blogData = { ...req.body };
    const existingBlog = await Blog.findOne({ slug: blogData.slug });
    if (existingBlog) {
      return sendError(res, 400, 'Blog with this slug already exists.');
    }

    const blog = new Blog(blogData);
    await blog.save();
    return sendSuccess(res, 201, 'Blog created successfully', { blog });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, 'Blog not found.');
    }

    Object.keys(req.body).forEach((key) => {
      blog[key] = req.body[key];
    });

    await blog.save();
    return sendSuccess(res, 200, 'Blog updated successfully', { blog });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, 'Blog not found.');
    }

    const deleteCloudinaryUrl = async (url) => {
      if (!url) return;
      const publicId = url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`finpay-blogs/${publicId}`);
    };

    await deleteCloudinaryUrl(blog.coverImage);
    if (blog.images?.length) {
      await Promise.all(blog.images.map(deleteCloudinaryUrl));
    }

    await Blog.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 200, 'Blog deleted successfully');
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'No image file provided.');
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, 'Blog not found.');
    }

    if (blog.coverImage) {
      const publicId = blog.coverImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`finpay-blogs/${publicId}`);
    }

    const result = await uploadToCloudinary(req.file.buffer, 'finpay-blogs');
    blog.coverImage = result.secure_url;
    await blog.save();

    return sendSuccess(res, 200, 'Cover image uploaded successfully', { coverImage: result.secure_url });
  } catch (error) {
    console.error('[uploadCoverImage] error:', error);
    return sendError(res, 500, error.message);
  }
};


export const uploadBlogImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return sendError(res, 400, 'No image files provided.');
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, 'Blog not found.');
    }

    const uploadedUrls = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer, 'finpay-blogs');
        return result.secure_url;
      })
    );

    blog.images = [...(blog.images || []), ...uploadedUrls];
    await blog.save();

    return sendSuccess(res, 200, 'Images uploaded successfully', { images: uploadedUrls });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const deleteBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, 'Blog not found.');
    }

    const imageIndex = parseInt(req.params.imageIndex, 10);
    if (Number.isNaN(imageIndex) || imageIndex < 0 || imageIndex >= blog.images.length) {
      return sendError(res, 400, 'Invalid image index.');
    }

    const imageUrl = blog.images[imageIndex];
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`finpay-blogs/${publicId}`);

    blog.images.splice(imageIndex, 1);
    await blog.save();

    return sendSuccess(res, 200, 'Image deleted successfully');
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};