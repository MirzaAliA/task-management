import express from "express";

const routerTask = express.Router();

import {
    deleteTaskDatabyId,
    getAllTaskData,
    getTaskDatabyId,
    patchTaskDatabyId,
    postTaskData,
    putTaskDatabyId
} from "../controllers/TaskController.js";

routerTask.get('/', getAllTaskData);
routerTask.get('/:id', getTaskDatabyId);
routerTask.post('/', postTaskData);
routerTask.put('/:id', putTaskDatabyId);
routerTask.patch('/:id', patchTaskDatabyId);
routerTask.delete('/:id', deleteTaskDatabyId);

export default routerTask;