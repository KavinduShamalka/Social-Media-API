import User from '../model/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found." });
  } else {
    return res.status(200).json({ users });
  }
}

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "Usear already exists." });
  } else {

    //Hashing the password
    const hashedPassword = bcrypt.hashSync(password);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      posts: []
    });

    try {
      await user.save();
    } catch (err) {
      return console.log(err);
    }

    return res.status(201).json({ user });
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;

    let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Could not find the user by this email." });
  } else { 
    const isPaaswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPaaswordCorrect) {
      return res.status(400).json({ message: "Invalid password!!!" });
    } else {
      return res.status(200).json({ messsage: "Login Successfull" });
    }
  }
  
}