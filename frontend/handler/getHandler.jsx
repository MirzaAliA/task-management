import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useGetTask() {
    const { task_id } = useParams();
    const query = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/v1/task/${task_id}`, {
                credentials: "include",
                method: "GET",
            });
            return res.json();
        },
        keepPreviousData: true,
    })

    return query;
}