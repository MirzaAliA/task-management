import { DataSource } from "typeorm";
import User from "../models/UserEntity.js";
import dotenv from "dotenv"
import Task from "../models/TaskEntity.js";

dotenv.config()

const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.PORT_MySQL,
    username: process.env.USERNAME_MySQL,
    password: process.env.PASSWORD_MySQL,
    database: process.env.DB_NAME_MySQL,
    synchronize: true,
    entities: [User, Task]
})

export const connectDB = async () => {
    try {
        await AppDataSource.initialize()
        console.log(`App connected to database MySQL`);
    }
    catch (err) {
        console.log(err);
    }
}

