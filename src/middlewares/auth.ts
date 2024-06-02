import { NextFunction , Request , Response } from "express";
import { UnauthrizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";


const authMiddleware = async (req : Request , res : Response , next :NextFunction) => {

// 1. extract the token from the header 
const token = req.headers.authrization

// 2. if token is not present , throw error on unautheraized
if (!token) {
    next( new UnauthrizedException ('Unauthrized' , ErrorCode.UNAUTHORIZED_EXCEPTION))
} 
try {

// 3. if token is present , verify that token & extract tha payload 
const payload = jwt.verify(token as string , JWT_SECRET) as any
// 4. to get the user from the payload 
const user = await prismaClient.user.findFirst ({where : {id:payload.userId}})
if (!user) {
    next( new UnauthrizedException ('Unauthrized' , ErrorCode.UNAUTHORIZED_EXCEPTION))
}
// 5. to attach the user to the current request object 
req.user = user as User
next()
}
catch (error) {
    next( new UnauthrizedException ('Unauthrized' , ErrorCode.UNAUTHORIZED_EXCEPTION))
}



}

export default authMiddleware