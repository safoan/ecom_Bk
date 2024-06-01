import {Router} from 'express'
import { signup } from '../controllers/auth'
import { login } from '../controllers/auth'
import { erorHandler } from '../error-handler'
import authMiddleware from '../middlewares/auth'

const authRoutes:Router = Router()

authRoutes.post('/signup', erorHandler (signup))
authRoutes.post('/login' , erorHandler(login))
authRoutes.get('/me' , [authMiddleware],erorHandler(me))

export  default authRoutes