import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function useEditTask() {
    const { task_id } = useParams();
    const navigate = useNavigate();
    const query = useMutation({
        mutationFn: async (data) => {
            const res = await fetch(`http://localhost:3000/api/v1/task/${task_id}`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    deadline: data.deadline
                })
            });
            if (!res.ok) throw new Error('Edit Task gagal')
            return res.json();
        }
    })

    useEffect(() => {
        if (query.isSuccess) {
            navigate("/tasks");
        }
    }, [query.isSuccess])
    return query;
}