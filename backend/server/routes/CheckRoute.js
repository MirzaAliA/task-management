import express from "express"
const routerCheck = express.Router();

import {
    checkUser
} from "../controllers/CheckController.js"

routerCheck.get('/', checkUser);

export default routerCheck;