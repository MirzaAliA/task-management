import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function useLogin() {
    const navigate = useNavigate();
    const query = useMutation({
        mutationFn: async (formData) => {
            const res = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Terjadi kesalahan")
        },
    })

    useEffect(() => {
        if (query.isSuccess) {
            navigate("/");
        }
    }, [query.isSuccess])

    return query;
}