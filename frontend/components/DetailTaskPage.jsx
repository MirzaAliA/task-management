import {
    useQuery,
} from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom';

export default function DetailTaskPage() {
    const { task_id } = useParams();
    const { data, isLoading, error } = useQuery({
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

    const Alldata = data?.data

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    return Alldata.length == 0 ? (
        <div>
            <div>Tidak ada task</div>
        </div>
    ) :
        (
            <div>
                <div>{Alldata.title}</div>
                <div>{Alldata.description}</div>
                <div>{Alldata.status}</div>
                <div>{Alldata.deadline}</div>
            </div>
        )

}