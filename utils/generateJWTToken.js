import jwt from 'jsonwebtoken';

// Function to generate a JWT token and set it as a cookie
export const generateJWTToken = (res, userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined"); // Ensure JWT secret is defined
    }

    // Create a JWT token with user ID and expiration
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d" // Token valid for 7 days
    });

    // Set the token as a cookie in the response
    res.cookie('token', token, {
        httpOnly: true, // Prevent client-side access to the cookie
        secure: process.env.NODE_ENV === 'local', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time
    });

    return token; 
};