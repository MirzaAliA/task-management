import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <>
            <div className="homepage-outer">
                <h1 className="ml-3">Home Page</h1>
                <Link type="button" className="btn btn-primary btn-task mt-3 ml-3" to="/tasks">Task</Link>
            </div>
        </>
    )
}