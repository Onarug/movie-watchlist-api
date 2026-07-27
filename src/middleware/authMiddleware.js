import jwt from 'jsonwebtoken'
import {prisma} from "../config/db.js";

// Read JWT token from request and check if token is valid

export const authMiddleware = async (req, res, next) => {
    console.log("Authmiddle ware reached");
    
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        token = req.headers.authorization.split(" ")[1]; // Makes an array of the bearer and the token
        
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    } 
    if(!token){
        return res.status(401).json({error: "token not provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {id : decoded.id}
        });
        req.user = user;
        next();
    } catch (error){
        return res.status(401).json({error: `token failed: ${error}`});
    }
   

};