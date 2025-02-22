import bcrypt from 'bcrypt';

const saltRound=10;
 export class Bcrypt{
private salt= bcrypt.genSaltSync(saltRound);

 async hashPassword(password:string):Promise<string>{
   return  bcrypt.hash(password,this.salt)
    }

    async verifyPassword (password:string, hashedPassword:string ):Promise<boolean>{
        return bcrypt.compare(password,hashedPassword);
    }

 }
