const mongoose = require("mongoose");
const schema = mongoose.schema;
const ObjectID = mongoose.ObjectID;

const User = new mongoose.Schema({
    email : String,
    password : String,
    name : String
})

const Todo = new mongoose.Schema({
    title: String,
    done: Boolean,
    userID: ObjectID
})

    const UserModel = mongoose.model('users',User);
    const TodoModel = mongoose.model('todos',todo);

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}