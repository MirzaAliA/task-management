import express from "express"
const routerAuth = express.Router();

import {
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/AuthController.js"

routerAuth.post('/register', registerUser);
routerAuth.post('/login', loginUser);
routerAuth.post('/logout', logoutUser);

export default routerAuth;