import { NextFunction , Request , Response } from "express";
import { UnauthrizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken';


const authMiddleware = async (req : Request , res : Response , next :NextFunction) => {

// 1. extract the token from the header 
const token = req.headers.authrization

// 2. if token is not present , throw error on unautheraized
if (!token) {
    next( new UnauthrizedException ('Unauthrized' , ErrorCode.UNAUTHORIZED_EXCEPTION))
} 
// 3. if token is present , verify that token & extract tha payload 
// 4. to get the user from the payload 
// 5. to attach the user to the current request object 


}

export default authMiddleware