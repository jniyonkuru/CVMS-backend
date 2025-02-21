import express,{Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Middleware } from './middlewares/Middlewares';
import connectDB from "./database/db.config";
import router from "./routes/index"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.get('/',(req:Request,res:Response)=>{
res.send("Volunteering Management system.");
});
app.use('/api',router)

app.use(Middleware.handleError);

app.use(Middleware.handleNotFound);





export default app;