import express from "express"
import "reflect-metadata"
import { connectDB } from "./server/config/db.js"
import dotenv from "dotenv"
import routerAuth from "./server/routes/AuthRoute.js"

const app = express()
const port = 3000

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config()

app.get('/', (req, res) => { res.json("Hello Nexa!")});
app.use('/api/v1/auth', routerAuth);

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});