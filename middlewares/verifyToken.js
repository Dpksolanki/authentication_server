import jwt from "jsonwebtoken";

// Middleware to verify JWT token from cookies
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        // If no token is found, respond with unauthorized status
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; 
        next(); 
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
