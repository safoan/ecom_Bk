import { NextFunction } from "express";
import { ErrorCode, HttpException } from "../exceptions/root";
import express, {Request, Response} from 'express';

export const errormiddlewear = (error: HttpException , req:Request ,res:Response, next :NextFunction) => {
    res.status(error.statusCode).json({
        message : error.message,
        ErrorCode : error.errorCode,
        errors : error.errors

    })
    
}