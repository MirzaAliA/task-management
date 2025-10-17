import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ProtectedRoute({ children }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["check"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/v1/check", {
                method: 'GET',
                credentials: "include",
            });
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        },
        retry: false,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <Navigate to="/login" replace />;

    return children;
}