import useCreateTask from "../handler/createHandler";

export default function InsertTaskPage() {

    const insertMutation = useCreateTask();

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: e.target[0].value,
            description: e.target[1].value,
            status: e.target[2].value,
            deadline: e.target[3].value
        }
        insertMutation.mutate(formData)
    }

    return (
        <>
            <div className="addtask-outer">
                <div className="addtask-title">
                    <h2>Add Task</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label">Judul Tugas</label>
                        <input name="title" type="text" id="inputTitle" className="form-control" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3 ">
                        <label className="form-label">Deskripsi</label>
                        <textarea name="description" type="text" id="inputDescription" className="form-control" rows="3" />
                    </div>

                    <label htmlFor="status" className="form-label">Status</label>
                    <input className="form-control mb-3" list="statuss" id="status" name="status" placeholder="Ketik untuk menentukan status..." />
                    <datalist id="statuss">
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </datalist>

                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label">Tanggal Deadline</label>
                        <input name="date" type="datetime-local" id="inputDate" className="form-control" />
                    </div>

                    {insertMutation.isError && (
                        <div className="mb-3" style={{ color: 'red' }}>{insertMutation.error.message}!</div>
                    )}

                    <button disabled={insertMutation.isPending} type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        {insertMutation.isPending ? 'Process...' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    )
}