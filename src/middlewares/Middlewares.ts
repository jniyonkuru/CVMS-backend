import { NextFunction, Request,Response } from "express";
import { Jwt } from "../utils/jwtUtils";

 export interface CustomRequest extends Request{
  user?:Record<string,any>
}

 export  class Middleware{
   
  static  handleError( err:Error,req:Request,res:Response,next:NextFunction):void{
     const statusCode= res.statusCode!== 201?res.statusCode:500;
      res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV==="production"?'':err.stack
      })

    }
    static handleNotFound(req:Request,res:Response,next:NextFunction):void{
      res.status(404);
       const error= new Error (`Request-not-found -${req.originalUrl}`);
       next(error)

}

 static authentication(role?:"volunteer"|"organization"){
 
 return(req:CustomRequest,res:Response,next:NextFunction):void=>{
  const jwtInstance= new Jwt();
  try {
    const token= req.headers.authorization?.split(" ")[1];
    if(!token){
    res.status(401);
     throw new Error("no token provided")
    }
    const user= jwtInstance.decodeToken(token);
    if(!user){
      res.status(401);
      throw new Error("invalid or expired token");
    }
    if (role && role !== user.role) {
      res.status(403).json({ message: "Unauthorized" });
      throw new Error("unathourized")
    }

  req.user=user;
   next()

  } catch (error) {
     next(error)
  }
 
 }
 }
}