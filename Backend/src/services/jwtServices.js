import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Tạo access token
export const generalAccessToken = (payload) => {
    const accessToken = jwt.sign({ payload }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1h",
    });
    return accessToken;
};

// Kiểm tra Token
export const generalVerifyToken = (token) => {
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return verifyToken;
    } catch (error) {
        throw new Error("Token verification failed");
    }
};
