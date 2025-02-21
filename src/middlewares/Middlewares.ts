import { NextFunction, Request,Response } from "express";

 export  class Middleware{
   
    static  handleError( err:Error,req:Request,res:Response,next:NextFunction){
     const statusCode= res.statusCode!== 201?res.statusCode:500;
      res.status(statusCode).json({
        message:err.message,
        stack:process.env.NODE_ENV==="production"?'':err.stack
      })

    }
    static handleNotFound(req:Request,res:Response,next:NextFunction){
      res.status(404);
       const error= new Error (`Request-not-found -${req.originalUrl}`);
       next(error)

}
 }