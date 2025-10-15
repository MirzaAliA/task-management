import { EntitySchema } from "typeorm";

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        user_id: { primary: true, type: "int", generated: true },
        name: { type: "varchar" },
        username: { type: "varchar", unique: true, nullable: false },
        password: { type: "varchar" }
    },
    relations: {
        tasks: {
            target: "Task",
            type: "one-to-many",
            inverseSide: "user"
        },
        tasks: {
            target: "Task",
            type: "one-to-many",
            inverseSide: "created_by"
        }
    }
})

export default User;