# FinPay Africa CMS Backend

A Node.js/Express backend for the FinPay Africa content management system, built with MongoDB and Cloudinary integration.

## Features

- **Authentication**: JWT-based authentication with single admin user
- **Blog Management**: Full CRUD operations for multi-language blog posts
- **Image Upload**: Cloudinary integration for blog images
- **Security**: Rate limiting, helmet, CORS, input validation
- **Multi-language**: Support for English and French content
- **SEO**: Built-in SEO fields for blog posts

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account for image storage

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   - MongoDB connection string
   - JWT secret key
   - Cloudinary credentials

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user (one-time)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination/filtering)
- `GET /api/blogs/categories` - Get blog categories
- `GET /api/blogs/:slug` - Get single blog
- `POST /api/blogs` - Create blog (Admin only)
- `PUT /api/blogs/:id` - Update blog (Admin only)
- `DELETE /api/blogs/:id` - Delete blog (Admin only)
- `POST /api/blogs/:id/upload-cover` - Upload cover image (Admin only)
- `POST /api/blogs/:id/upload-images` - Upload additional images (Admin only)
- `DELETE /api/blogs/:id/images/:imageIndex` - Delete image (Admin only)

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── errorHandler.js     # Error handling middleware
├── models/
│   ├── Blog.js             # Blog model
│   └── User.js             # User model
├── routes/
│   ├── auth.js             # Authentication routes
│   └── blogs.js            # Blog routes
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── server.js               # Main application file
└── README.md               # This file
```

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### First Admin Setup

After starting the server, register your first admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@finpay.africa",
    "password": "your-secure-password"
  }'
```

**⚠️ Important**: After creating the admin user, consider disabling the register endpoint in production or adding additional security measures.

## Deployment

### Environment Variables for Production

Ensure these are set in your production environment:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### PM2 Deployment (Recommended)

```bash
npm install -g pm2
pm2 start server.js --name "finpay-backend"
pm2 startup
pm2 save
```

## Security Considerations

- Change the JWT secret in production
- Use HTTPS in production
- Regularly update dependencies
- Monitor rate limits and implement additional security measures as needed
- Consider implementing API versioning for future updates

## Contributing

1. Follow the existing code structure
2. Add proper validation and error handling
3. Update documentation for new features
4. Test thoroughly before committing

## License

ISC