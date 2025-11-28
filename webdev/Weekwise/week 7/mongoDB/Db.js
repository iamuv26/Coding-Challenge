const mongoose = require('mongoose');
const { z } = require('zod'); // ✅ Import Zod

// ✅ MongoDB connection string (prefer .env in production)
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://yuviyadav277_db_user:KSeGOT2HN60RpKnM@cluster0.vzrz1it.mongodb.net/todo-Yuvraj';

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

const { Schema } = mongoose;

/************************************
 * 🧩 ZOD VALIDATION SCHEMAS
 ************************************/

// ✅ Signup validation (new Zod syntax)
const UserZodSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// ✅ Signin validation (new Zod syntax)
const SigninZodSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// ✅ Todo validation (new Zod syntax)
const TodoZodSchema = z.object({
  title: z.string().min(1, { message: 'Todo title is required' }),
});

/************************************
 * 🧱 MONGOOSE SCHEMAS & MODELS
 ************************************/

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// ✅ Models
const UserModel = mongoose.model('User', UserSchema);
const TodoModel = mongoose.model('Todo', TodoSchema);

/************************************
 * 📦 EXPORT EVERYTHING
 ************************************/

module.exports = {
  mongoose,
  UserModel,
  TodoModel,
  UserZodSchema,   // for signup validation
  SigninZodSchema, // for signin validation
  TodoZodSchema,   // for todo creation validation
};
