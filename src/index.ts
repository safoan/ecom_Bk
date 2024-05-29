import express ,{Express , Request , Response} from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errormiddlewear } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";


const app:Express = express() 

app.use (express.json())


app.use('/api' , rootRouter)

export const prismaClient = new PrismaClient ({
    log:['query']
})

app.use(errormiddlewear)

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
  })


