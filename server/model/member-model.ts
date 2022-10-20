import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    username: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: Date.now()
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    }
})

export default mongoose.model('member', memberSchema)