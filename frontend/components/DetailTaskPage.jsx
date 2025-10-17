import useGetTask from '../handler/getHandler';

export default function DetailTaskPage() {
    const { data, isLoading, error } = useGetTask();

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