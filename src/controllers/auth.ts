import { NextFunction, Request , Response } from "express";
import { prismaClient } from "..";
import {hashSync , compareSync} from 'bcrypt';
import * as jwt from  'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { badrequestException } from "../exceptions/badrequest";
import { ErrorCode } from "../exceptions/root";

//the sign up end point starts
export const signup = async ( req:Request, res:Response , next: NextFunction) => {
    const {email,password,name} = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
      next (new badrequestException ('User Already Exist!',ErrorCode.USER_ALREADY_EXIST))
    }
    
   //Create a new user with the hashed password
    user = await prismaClient.user.create ({
        data:{
            name,
            email,
            password:hashSync(password,10)
        },
    });
    res.json(user)
}
//the sign up endpoint ends


//the login endpoint starts 
export const login = async (req:Request,res:Response) => {
    const {email,password} = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
      throw Error('user does not existe');
    }
    if (!compareSync(password,user.password)) {
        throw Error ('incorrect password')
    }
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)


   
    res.json({user,token})
}

//the sign up endpoint ends

