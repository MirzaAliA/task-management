import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import useEditTask from "../handler/putHandler";
import { useParams } from "react-router-dom";

export default function EditTaskPage() {
    const editMutation = useEditTask();

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

    const Alldata = data?.data;

    function formatForDatetimeLocal(isoString) {
        const date = new Date(isoString);
        const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return local.toISOString().slice(0, 16);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: e.target[0].value,
            description: e.target[1].value,
            status: e.target[2].value,
            deadline: e.target[3].value
        }
        editMutation.mutate(data)
        console.log(data);
    }

    return (
        <>
            <div className="addtask-outer">
                <div className="addtask-title">
                    <h2>Edit Task</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label">Judul Tugas</label>
                        <input defaultValue={Alldata.title ? Alldata.title : ""} name="title" type="text" id="inputTitle" className="form-control" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3 ">
                        <label className="form-label">Deskripsi</label>
                        <textarea defaultValue={Alldata.description ? Alldata.description : ""} name="description" type="text" id="inputDescription" className="form-control" rows="3" />
                    </div>

                    <label htmlFor="status" className="form-label">Status</label>
                    <input defaultValue={Alldata.status ? Alldata.status : ""} className="form-control mb-3" list="statuss" id="status" name="status" placeholder="Ketik untuk menentukan status..." />
                    <datalist id="statuss">
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </datalist>

                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label">Tanggal Deadline</label>
                        <input defaultValue={formatForDatetimeLocal(Alldata.deadline || new Date().toISOString())} name="date" type="datetime-local" id="inputDate" className="form-control" />
                    </div>

                    <button disabled={editMutation.isPending} type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        Edit
                    </button>
                </form>
            </div>
        </>
    )
}