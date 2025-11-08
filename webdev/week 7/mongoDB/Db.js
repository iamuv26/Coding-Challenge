const mongoose = require('mongoose');

// MONGO_URI can be provided via env
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yuviyadav277_db_user:KSeGOT2HN60RpKnM@cluster0.vzrz1it.mongodb.net/todo-Yuvraj';

// Connect once when this module is required
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err.message);
});

const { Schema, Types } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String }
}, { timestamps: true });

const TodoSchema = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    userID: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = {
    UserModel,
    TodoModel,
    mongoose
};