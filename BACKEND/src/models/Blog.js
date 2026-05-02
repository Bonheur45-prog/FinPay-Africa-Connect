import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const blogSchema = new mongoose.Schema({
  // Multi-language content
  title: {
    en: { type: String, required: true, trim: true },
    fr: { type: String, required: true, trim: true }
  },
  description: {
    en: { type: String, required: true },
    fr: { type: String, required: true }
  },
  content: {
    en: { type: String, required: true },
    fr: { type: String, required: true }
  },
  excerpt: {
    en: { type: String, required: true },
    fr: { type: String, required: true }
  },

  // Metadata
  slug: { type: String, required: true, unique: true, lowercase: true },
  category: {
    type: String,
    required: true,
    enum: ['product', 'engineering', 'growth', 'security', 'design', 'culture']
  },
  tags: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },

  // Author information
  author: {
    name: { type: String, required: true },
    avatar: { type: String }, // Cloudinary URL
    bio: {
      en: { type: String },
      fr: { type: String }
    }
  },

  // Media
  coverImage: { type: String }, // Cloudinary URL
  images: [{ type: String }], // Additional images

  // SEO
  seoTitle: {
    en: { type: String },
    fr: { type: String }
  },
  seoDescription: {
    en: { type: String },
    fr: { type: String }
  },
  seoKeywords: {
    en: [{ type: String }],
    fr: [{ type: String }]
  },

  // Analytics
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },

  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },

  // Timestamps
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
blogSchema.index({ 'title.en': 'text', 'title.fr': 'text', 'content.en': 'text', 'content.fr': 'text' });
blogSchema.index({ category: 1, status: 1, featured: -1, publishedAt: -1 });
blogSchema.index({ slug: 1 });

// Virtual for reading time
blogSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const enWordCount = this.content.en ? this.content.en.split(' ').length : 0;
  const frWordCount = this.content.fr ? this.content.fr.split(' ').length : 0;
  const avgWordCount = (enWordCount + frWordCount) / 2;
  return Math.ceil(avgWordCount / wordsPerMinute);
});

// Add pagination plugin
blogSchema.plugin(mongoosePaginate);

// Pre-save middleware
blogSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;