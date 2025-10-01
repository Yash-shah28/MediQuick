import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    PharmacyName: {
        type: String,
        required: true
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
);

export const User = model('User', userSchema);