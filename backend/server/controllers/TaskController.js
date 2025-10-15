import Task from "../models/TaskEntity.js";
import { AppDataSource } from "../config/db.js";
import { sendOkResponse, sendErrorResponse } from "../core/response.js";

export const getAllTaskData = async (req, res) => {
    try {
        const { user_id } = req.user;

        if (!user_id) {
            return sendErrorResponse(res, { message: "User ID empty" }, 401)
        }

        const findAllTask = await AppDataSource
            .getRepository(Task)
            .createQueryBuilder("task")
            .where("task.user_id = :user_id", { user_id })
            .getMany()

        sendOkResponse(res, findAllTask, `Success get data with user id: ${user_id}`);
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getTaskDatabyId = async (req, res) => {
    try {
        const { user_id } = req.user;
        const  task_id  = req.params.id;

        if (!user_id) {
            return sendErrorResponse(res, { message: "User ID empty" }, 401)
        }
        if (!task_id) {
            return sendErrorResponse(res, { message: "Task ID empty" }, 401)
        }

        const findTaskbyId = await AppDataSource
            .getRepository(Task)
            .createQueryBuilder("task")
            .where("task.user_id = :user_id AND task.task_id = :task_id", { user_id, task_id })
            .getOne()

        sendOkResponse(res, findTaskbyId, `Success get data with user_id: ${user_id} and task_id: ${task_id}`);
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const postTaskData = async (req, res) => {
    try {
        const { user_id } = req.user;
        const { title, description, status, deadline } = req.body;

        if (!user_id) {
            return sendErrorResponse(res, { message: "User ID empty" }, 401)
        }

        if (!title) {
            return sendErrorResponse(res, { message: "Please input a Title" }, 401)
        }
        if (!description) {
            return sendErrorResponse(res, { message: "Please input a Description" }, 401)
        }
        if (!status) {
            return sendErrorResponse(res, { message: "Please input a Status" }, 401)
        }
        if (status !== "To Do" || "In Progress" || "Done") {
            return sendErrorResponse(res, { message: "Please input a Status either To Do/In Progress/Done" }, 401)
        }
        if (!deadline) {
            return sendErrorResponse(res, { message: "Please input a Deadline" }, 401)
        }

        const ISODate = deadline;

        const insertTask = await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(Task)
            .values({
                user_id: user_id,
                title,
                description,
                status,
                deadline: ISODate,
                created_by: user_id
            })
            .execute()

        sendOkResponse(res, insertTask, `Success insert data with user_id: ${user_id}`);
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const putTaskDatabyId = async (req, res) => {
    try{
        const { user_id } = req.user;
        const  task_id  = req.params.id;
        const { title, description, status, deadline } = req.body;

        if (!user_id) {
            return sendErrorResponse(res, { message: "User ID empty" }, 401)
        }
        if (!task_id) {
            return sendErrorResponse(res, { message: "Task ID empty" }, 401)
        }

        if (!title) {
            return sendErrorResponse(res, { message: "Please input a Title" }, 401)
        }
        if (!description) {
            return sendErrorResponse(res, { message: "Please input a Description" }, 401)
        }
        if (!status) {
            return sendErrorResponse(res, { message: "Please input a Status" }, 401)
        }
        if (!deadline) {
            return sendErrorResponse(res, { message: "Please input a Deadline" }, 401)
        }
        if (status !== "To Do" && status !== "In Progress" && status !== "Done") {
            return sendErrorResponse(res, { message: "Please input a Status either To Do/In Progress/Done" }, 401)
        }

        const ISODate = deadline;

        const updatePutTask = await AppDataSource
            .createQueryBuilder()
            .update(Task)
            .set({
                title,
                description,
                status,
                deadline: ISODate,
                created_by: user_id
            })
            .where("tasks.user_id = :user_id AND tasks.task_id = :task_id", { user_id, task_id })
            .execute()

        sendOkResponse(res, updatePutTask, `Success update data with user_id: ${user_id} and task_id: ${task_id}`);
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const patchTaskDatabyId = async (req, res) => {
    try{
        const { user_id } = req.user;
        const  task_id  = req.params.id;
        const updates = req.body;

        if (!user_id) {
            return sendErrorResponse(res, { message: "User ID empty" }, 401)
        }
        if (!task_id) {
            return sendErrorResponse(res, { message: "Task ID empty" }, 401)
        }

        if (updates.status !== "To Do" && updates.status !== "In Progress" && updates.status !== "Done") {
            return sendErrorResponse(res, { message: "Please input a Status either To Do/In Progress/Done" }, 401)
        }

        const updatePatchTask = await AppDataSource
            .createQueryBuilder()
            .update(Task)
            .set(updates)
            .where("tasks.user_id = :user_id AND tasks.task_id = :task_id", { user_id, task_id })
            .execute()

        sendOkResponse(res, updatePatchTask, `Success update data with user_id: ${user_id} and task_id: ${task_id}`);
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const deleteTaskDatabyId = async (req, res) => {
    try{
        const { user_id } = req.user;
        const  task_id  = req.params.id;

        if (!user_id) {
            return sendErrorResponse(res, { message: "User ID empty" }, 401)
        }
        if (!task_id) {
            return sendErrorResponse(res, { message: "Task ID empty" }, 401)
        }

        const deleteTask = await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Task)
        .where("tasks.user_id = :user_id AND tasks.task_id = :task_id", { user_id, task_id })
        .execute()

        sendOkResponse(res, deleteTask, `Success delete data with user_id: ${user_id} and task_id: ${task_id}`);
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}