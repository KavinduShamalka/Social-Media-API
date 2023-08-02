import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRoutes';
import postRouter from './routes/postRoutes';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/users", router);
app.use("/api/posts", postRouter);


mongoose.connect(
  'mongodb+srv://admin123:admin123@cluster0.jitj8i0.mongodb.net/SocialMedia?retryWrites=true&w=majority'
)
  .then(() => app.listen(PORT))
  .then(() => console.log('Successfully connected to Database.'))
  .catch ((err) => console.log(`Error: ${err} have occured!!!`));
