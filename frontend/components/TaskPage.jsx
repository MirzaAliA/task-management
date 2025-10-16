import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export default function TaskPage() {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
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
            // Refetch data setelah delete sukses
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    })

    const handleDelete = (task_id) => {
        deleteMutation.mutate(task_id)
    }

    const { data, isLoading, error } = useQuery({
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

    const Alldata = Array.isArray(data?.data) ? data.data : [];;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    return Alldata.length == 0 ? (
        <div>
            <div>Tidak ada task</div>
        </div>
    ) :
        (
            <div>
                {Alldata?.map((task, i) => {
                    return <div key={i}>
                        <div>{task.title}</div>
                        <div>{task.description}</div>
                        <div>{task.status}</div>
                        <div>{task.deadline}</div>
                        <Link to={`/tasks/${task.task_id}`}>Detail Task</Link>
                        <Link onClick={() => handleDelete(task.task_id)}>Delete</Link>
                    </div>
                })}
            </div>
        )

}