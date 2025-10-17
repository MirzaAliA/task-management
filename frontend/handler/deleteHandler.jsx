import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTask() {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: async (task_id) => {
            const res = await fetch(`http://localhost:3000/api/v1/task/${task_id}`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error('Delete gagal')
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    })

    return query;
}