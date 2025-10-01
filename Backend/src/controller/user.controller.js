import { User } from '../model/user.model.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address, PharmacyName } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ sucess: false, message: "User With this Email Already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip
            },
            PharmacyName
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        return res.status(201).json({
            sucess: true,
            message: "User Registered Successfully",
            user: {
                name: user.name,
                email: user.email,
                PharmacyName: user.PharmacyName
            }

        });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }

}

export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" });
        }

        const ispasswordvalid = await bcrypt.compare(password, user.password);

        if (!ispasswordvalid) {
            return res.status(400).json({ success: false, message: "Inavlid Email or password" });
        }

        generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                PharmacyName: user.PharmacyName
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }

}

export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            message: "User authenticated",
            user: {
                name: user.name,
                email: user.email,
                PharmacyName: user.PharmacyName
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getUserProfile = async (req, res) => { }

export const updateUserProfile = async (req, res) => { }


// Admin Use only 
export const deleteUser = async (req, res) => { }

export const getAllUsers = async (req, res) => { }

