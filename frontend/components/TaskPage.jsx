import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TaskPage() {
    const [selectedTask, setSelectedTask] = useState(0);
    const [selectedTaskId, setSelectedTaskId] = useState(0);
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

    const Alldata = Array.isArray(data?.data) ? data.data : [];

    

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
        <div className="taskpage-outer">
            <Link type="button" className="btn btn-primary" to="/tasks/add">+</Link>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Judul Task</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Status</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tidak ada task</td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) :
        (
            <div className="taskpage-outer">
                <Link type="button" className="btn btn-primary mb-3" to="/tasks/add">+ Add Data</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Judul Task</th>
                            <th scope="col">Deskripsi</th>
                            <th scope="col">Status</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Alldata?.map((task, i) => {
                            return <tr key={i}>
                                <td>{i + 1}.</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{formatForDatetimeLocal(task.deadline)}</td>
                                <td>
                                    <Link type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal" onClick={() => setSelectedTask(i)}>ⓘ</Link>
                                    <Link type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={() => setSelectedTaskId(task.task_id)}>🗑</Link>
                                    <Link type="button" className="btn btn-secondary" to={`/tasks/edit/${task.task_id}`}>✎</Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">Yakin ingin menghapus data ini?</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(selectedTaskId)}>Ya, Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header modal-delete-header">
                                <h1 className="modal-title fs-5" id="detailModalLabel">{Alldata[selectedTask].title}</h1>
                                <h5 className="modal-title fs-5" id="detailModalLabel">{Alldata[selectedTask].status}</h5>
                            </div>
                            <div className="modal-body">
                                {Alldata[selectedTask].description}
                            </div>
                            <div className="modal-body">
                                Deadline: {formatForDatetimeLocal(Alldata[selectedTask].deadline)}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

}