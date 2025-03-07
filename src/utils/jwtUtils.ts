import jwt, { Secret, JwtPayload, SignOptions } from 'jsonwebtoken';

 export class Jwt{
 private secret:Secret;
 constructor(){
    this.secret=process.env.SECRET_KEY ||'my_secret_key';
 }
 generateToken(payload:JwtPayload):string{

    return jwt.sign(payload,this.secret,{expiresIn:'1h'});

 }
 decodeToken(token:string):JwtPayload{ 
   try {
      const decoded:JwtPayload=jwt.verify(token, this.secret) as JwtPayload;
      return decoded;
   } catch (error) {
       throw error
   }
  
 }

}
