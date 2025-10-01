import express from 'express';
import { body } from 'express-validator';

import { registerUser, loginUser, deleteUser, updateUserProfile, getUserProfile, logoutUser, getAllUsers, checkAuth } from '../controller/user.controller.js';
import { verfiyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Full name is required'),
    body('PharmacyName').notEmpty().withMessage('Pharmacy Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('address.street').notEmpty().withMessage('Street is required'),
    body('address.city').notEmpty().withMessage('City is required'),
    body('address.state').notEmpty().withMessage('State is required'),
    body('address.zip').notEmpty().withMessage('Zip code is required')
], registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
], loginUser);

router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

router.get('/checkAuth', verfiyToken ,checkAuth);

export default router;