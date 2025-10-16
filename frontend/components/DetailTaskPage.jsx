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

    function formatForDatetimeLocal(isoString) {
        const date = new Date(isoString).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Jakarta"
        });
        return date;
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    return Alldata.length == 0 ? (
        <div>
            <div>Tidak ada task</div>
        </div>
    ) :
        (
            <div>
                <div className="card-outer">
                    <div className="card-body">
                        <h5 className="card-title">{Alldata.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{Alldata.status}</h6>
                        <p className="card-text">{Alldata.description}</p>
                        <p className="card-text">Deadline: {formatForDatetimeLocal(Alldata.deadline)}</p>
                    </div>
                </div>
            </div>
        )

}