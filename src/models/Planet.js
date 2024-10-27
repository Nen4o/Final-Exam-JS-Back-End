const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is requited'],
        minLength: [2, 'The Name should be at least 2 characters'],
    },
    age: {
        type: Number,
        required: [true, 'Age is requited'],
        min: [1, 'The Age should be a positive number']
    },
    solarSystem: {
        type: String,
        required: [true, 'Solar system is requited'],
        minLength: [2, 'The Solar System should be at least 2 characters'],
    },
    type: {
        type: String,
        enum: {
            values: ['Inner', 'Outer', 'Dwarf'],
            message: '{VALUE} is not a valid type. Allowed values are: Inner, Outer, Dwarf.',
        },
    },
    moons: {
        type: Number,
        required: [true, 'Moons is requited'],
        min: [1, 'The Moons should be a positive number'],
    },
    size: {
        type: Number,
        required: [true, 'Size is requited'],
        min: [1, 'The Size should be a positive number'],
    },
    rings: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            message: '{VALUE} is not a valid type. Allowed values are: Yes, No.',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is requited'],
        minLength: [10, 'The Description should be between 10 and 100 characters long'],
        maxLength: [100, 'The Description should be between 10 and 100 characters long'],
    },
    image: {
        type: String,
        required: [true, 'Image is requited'],
        validate: [/^https?:\/\//, 'The Image should start with http:// or https://'],
    },
    likedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;