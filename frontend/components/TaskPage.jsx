import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDeleteTask from '../handler/deleteHandler';
import useGetAllTask from '../handler/getAllHandler';

export default function TaskPage() {
    const [selectedTask, setSelectedTask] = useState(0);
    const [selectedTaskId, setSelectedTaskId] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState(null);
    const [filterStatusBy, setFilterStatusBy] = useState("");

    const deleteMutation = useDeleteTask();

    const handleDelete = (task_id) => {
        deleteMutation.mutate(task_id)
    }

    const { data, isLoading, error } = useGetAllTask();

    const Alldata = Array.isArray(data?.data) ? data.data : [];

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    }

    const sortedData = [...Alldata].sort((a, b) => {
        if (!sortBy) return 0;

        let varA = a[sortBy];
        let varB = b[sortBy];

        if (sortBy === "deadline") {
            varA = new Date(varA);
            varB = new Date(varB);
        }

        if (typeof varA === "string") {
            return sortOrder === "asc" ? varA.localeCompare(varB) : varB.localeCompare(varA);
        }

        return sortOrder === "asc" ? varA - varB : varB - varA;
    })

    const filteredDataByStatus = [...sortedData].filter(function (data) {
        if(filterStatusBy === "") {
            return data;
        }
        return data.status === filterStatusBy
    });

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
            <Link type="button" className="btn btn-primary" to="/tasks/add">+ Add Data</Link>
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
                    <tr>
                        <td>Tidak ada task</td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) :
        (
            <div className="taskpage-outer">
                <div className="taskpage-title">
                    <Link type="button" className="btn btn-primary mb-3" to="/tasks/add">+ Add Data</Link>
                    <div className="dropdown">
                        <label htmlFor="status" className="form-label mr-2">Status: </label>
                        <button id="status" className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {filterStatusBy}
                        </button>
                        <ul className="dropdown-menu">
                            <li><option className="dropdown-item" value="To Do" onClick={() => setFilterStatusBy("")}>Not Filtered</option></li>
                            <li><option className="dropdown-item" value="To Do" onClick={() => setFilterStatusBy("To Do")}>To Do</option></li>
                            <li><option className="dropdown-item" value="In Progress" onClick={() => setFilterStatusBy("In Progress")}>In Progress</option></li>
                            <li><option className="dropdown-item" value="Done" onClick={() => setFilterStatusBy("Done")}>Done</option></li>
                        </ul>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th style={{ width: "10vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} scope="col" onClick={() => handleSort("title")}>Judul Task {sortBy === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                            <th style={{ width: "35vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} scope="col" onClick={() => handleSort("description")}>Deskripsi {sortBy === "description" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                            <th scope="col" onClick={() => handleSort("status")}>Status {sortBy === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                            <th scope="col" onClick={() => handleSort("deadline")}>Deadline {sortBy === "deadline" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDataByStatus?.map((task, i) => {
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
                                <button className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleDelete(selectedTaskId)}>Ya, Hapus</button>
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