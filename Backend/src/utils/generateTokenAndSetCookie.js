import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token will expire in 7 day
    });

    res.cookie('token', token, {
        httpOnly: true, //protects against XSS
        secure: true, // cookie only over HTTPS
        sameSite: 'none', // allows cross-site cookie (needed for Vercel ↔ backend)
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
}