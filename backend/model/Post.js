import mongoose from 'mongoose';

const schema = mongoose.Schema;

const postSchema = new schema({
  post: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

export default mongoose.model("Post", postSchema);
