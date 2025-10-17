import express from "express"
import cookieParser from "cookie-parser";
import "reflect-metadata"
import { connectDB } from "./server/config/db.js"
import dotenv from "dotenv"
import routerAuth from "./server/routes/AuthRoute.js"
import routerTask from "./server/routes/TaskRoute.js"
import routerCheck from "./server/routes/CheckRoute.js"
import authMiddleware from "./server/middlewares/authMiddleware.js"
import cors from "cors";

const app = express()
const port = 3000

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get('/', (req, res) => { res.json("Hello Nexa!") });
app.use('/api/v1/auth', routerAuth);
app.use('/api/v1/task', authMiddleware, routerTask);
app.use('/api/v1/check', authMiddleware, routerCheck);

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});