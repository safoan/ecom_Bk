import { HttpException , ErrorCode } from "./root";

export class badrequestException extends HttpException {
    constructor(message:string , errorcode:ErrorCode){
        super(message, errorcode , 400 ,null)
    }
}