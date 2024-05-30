import {Router} from 'express'
import { signup } from '../controllers/auth'
import { login } from '../controllers/auth'
import { erorHandler } from '../error-handler'

const authRoutes:Router = Router()

authRoutes.post('/signup', erorHandler (signup))
authRoutes.post('/login' , erorHandler(login))

export  default authRoutes