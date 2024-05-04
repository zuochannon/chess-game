import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } 
    // else 
    //     return res.status(401).json({error: "Unauthorized: Token unavailable or invalid."})
}