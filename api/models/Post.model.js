import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://janetcobur.files.wordpress.com/2023/11/ai-writer.jpeg?w=1024",
  },
  category: {
    type: String,
    default: "uncategorized",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true});

const Post = mongoose.model('post', postSchema);

export default Post;