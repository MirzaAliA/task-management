import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function useLogin() {
    const navigate = useNavigate();
    const query = useMutation({
        mutationFn: async (data) => {
            const res = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            });
            if (!res.ok) throw new Error('Login gagal')
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