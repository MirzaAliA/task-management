import User from "../models/UserEntity.js";
import { AppDataSource } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendOkResponse, sendErrorResponse } from "../core/response.js";

export const registerUser = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!username) {
            return sendErrorResponse(res, { message: "Please input an Email" }, 401)
        }

        if (!password) {
            return sendErrorResponse(res, { message: "Please input a Password" }, 401)
        }

        if (!name) {
            return sendErrorResponse(res, { message: "Please input a Name" }, 401)
        }

        const findUser = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOne()

        if (findUser) {
            if (username === findUser.username) {
                return sendErrorResponse(res, { message: "Username has already been taken" }, 409);
            }
        }

        // Config hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const Users = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                name,
                username,
                password: hashedPassword
            })
            .execute()

        sendOkResponse(res, Users, "Success Insert Data");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return sendErrorResponse(res, { message: "Please input an Username" }, 401)
        }

        if (!password) {
            return sendErrorResponse(res, { message: "Please input a Password" }, 401)
        }

        const findUser = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOne()

        if (!findUser) {
            return sendErrorResponse(res, { message: "Username not found" }, 401)
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);

        if (!comparePassword) {
            return sendErrorResponse(res, { message: "Password don't match" }, 401)
        }

        const token = jwt.sign({
            user_id: findUser.user_id.toString(),
            username: findUser.username
        }, process.env.SECRET, { expiresIn: 60 * 60 * 24});

        sendOkResponse(res, { token, name: findUser.name }, "Success Login");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}