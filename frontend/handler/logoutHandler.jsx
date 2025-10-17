import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const navigate = useNavigate();
    const query = useMutation({
        mutationFn: async () => {
            const res = await fetch('http://localhost:3000/api/v1/auth/logout', {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Terjadi kesalahan")
        },
    })

    useEffect(() => {
        if (query.isSuccess) {
            navigate("/login");
        }
    }, [navigate, query.isSuccess])

    return query;
}