import mongoose from 'mongoose';
import Post from '../model/Post.js';
import User from '../model/User.js';

export const getAllPosts = async (re, res, next) => {
  
  let posts;

  try {
    posts = await Post.find();
  } catch (err) {
    return console.log(err);
  }

  if (!posts) {
    return res.status(400).json({message: "No posts found!!!"});
  } else {
    return res.status(200).json({posts});
  }
} 

export const addPost = async (req, res, next) => {
  const { post, image, user } = req.body;
  
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.ststus(400).json({message: `Unable to find user by this id`});
  }

  const addPost = new Post({
    post,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await addPost.save({session});
    existingUser.posts.push(addPost);
    await existingUser.save({session});
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: err});
  }
  return res.status(200).json({addPost}); 
};

export const updatePost = async (req, res, next) => {
  const {post, image} = req.body;
  const postID = req.params.id;
  let updatePost;

  try {
    updatePost = await Post.findByIdAndUpdate(postID, {
    post,
    image
  });
  } catch (err) {
    return console.log(err);
  }

  if (!updatePost) {
    return res.status(500).json({message: "Unable to update the post!!!"});
  } else {
    return res.status(200).json({message: "Updated Successfully"});
  }

}

export const getPostByID = async (req, res, next) => {
  
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!post) {
    return res.status(404).json({message: "No post found!!!"});
  } else {
    return res.status(200).json({post});
  }
}

export const deletePost = async (req, res, next) => {

  const id = req.params.id;
  let post;

  try {
    // Find the post by its ID and populate the 'user' field
    post = await Post.findByIdAndRemove(id).populate("user");

    if (!post) {
      // If the post with the given ID is not found, return a 404 response
      return res.status(404).json({ message: "Post not found." });
    } else {
      // Remove the post from the user's post array
      await post.user.posts.pull(post);

      // Save the updated user document directly to the database
      await post.user.save();
    }
  } catch (err) {
    // Handle any errors that occurred during the process
    console.error(err);
  }

  if (!post) {
    // Send a unsuccess response
    return res.status(500).json({ message: "Unable delete." });
  } else {
    // Send a success response
    return res.status(200).json({ message: "Successfully deleted." });
  }
};

export const getPostByUID = async (req, res, next) => {
  
  const userID = req.params.id;
  let userPosts;

  try {
    userPosts = await User.findById(userID).populate('posts');
  } catch (err) {
    return console.log(err);
  }

  if (!userPosts) {
    return res.status(404).json({ message: "No posts not found." });
  } else {
    return res.status(200).json({posts:userPosts});
  }
}
