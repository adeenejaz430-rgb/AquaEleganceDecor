import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [200, 'Excerpt cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name']
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);