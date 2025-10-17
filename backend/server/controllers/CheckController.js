import User from "../models/UserEntity.js";
import { sendErrorResponse, sendOkResponse } from "../core/response.js";
import { AppDataSource } from "../config/db.js";

export const checkUser = async (req, res) => {
    try {
        const { user_id } = req.user;
        const findUser = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.user_id = :user_id", { user_id: user_id })
            .getOne()

        sendOkResponse(res, findUser, "Success Checking Login");
    }
    catch {
        sendErrorResponse(res, err, 500)
    }
}