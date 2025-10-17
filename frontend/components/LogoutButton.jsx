import useLogout from "../handler/logoutHandler"

export default function LogoutButton() {

    const useMutation = useLogout()

    const handleLogout = () => {
        useMutation.mutate()
    }

    return (
        <>
            <div className="logout-outer">
                <button onClick={handleLogout} type="button" className="btn btn-danger">Logout</button>
            </div>
        </>
    )
}