import { useQuery } from "@tanstack/react-query";

export default function useGetAllTask() {
    const query = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/api/v1/task', {
                credentials: "include",
                method: "GET"
            });
            return res.json();
        },
        keepPreviousData: true,
    })

    return query;
}