const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'The username should be between 2 and 20 characters long!'],
        maxLength: [20, 'The username should be between 2 and 20 characters long!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'The email should be at least 10 characters long!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'The password should be at least 4 characters long!']
    }
})

userSchema.pre('save', async function () {
    try {
        console.log(this.password);
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
    } catch (err) {
        console.log(err);
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;