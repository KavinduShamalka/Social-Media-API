import express from 'express';
import { addPost, deletePost, getAllPosts, getPostByID, getPostByUID, updatePost } from '../controllers/postController';

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostByID);
postRouter.post("/addpost", addPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);
postRouter.get("/user/:id", getPostByUID);


export default postRouter;

