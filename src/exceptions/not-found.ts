import { HttpException , ErrorCode } from "./root";

export class NotFoundException extends HttpException {
    constructor(message:string , errorcode:ErrorCode){
        super(message, errorcode , 404 ,null)
    }
}