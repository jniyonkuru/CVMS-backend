import express,{Request,Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Middleware } from './middlewares/Middlewares';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// app.use('/',(req:Request,res:Response)=>{
// res.send("Volunteering Management system.");
// })

app.use(Middleware.handleError);

app.use(Middleware.handleNotFound);





export default app;