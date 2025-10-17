import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function useCreateTask() {
    const navigate = useNavigate();
    const query = useMutation({
        mutationFn: async (formData) => {
            const res = await fetch('http://localhost:3000/api/v1/task', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    status: formData.status,
                    deadline: formData.deadline
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Terjadi kesalahan")
        }
    })

    useEffect(() => {
        if (query.isSuccess) {
            navigate("/tasks");
        }
    }, [query.isSuccess])

    return query;
}