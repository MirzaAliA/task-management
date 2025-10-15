import { EntitySchema } from "typeorm";

const Task = new EntitySchema({
    name: "Task",
    tableName: "tasks",
    columns: {
        task_id: { primary: true, type: "int", generated: true },
        title: { type: "varchar" },
        description: { type: "varchar" },
        status: { type: "enum", enum: ["To Do", "In Progress", "Done"], default: "To Do" },
        deadline: { type: "datetime"},
    },
    relations: {
        user_id: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "user_id",
            },
        },
        created_by: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "created_by",
            },
        }
    }
})

export default Task;