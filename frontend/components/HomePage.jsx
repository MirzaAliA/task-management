import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <Link type="button" className="btn btn-primary" to="/">Home</Link>
            <Link type="button" className="btn btn-primary" to="/login">Login</Link>
            <Link type="button" className="btn btn-primary" to="/tasks/add">Add</Link>
            <Link type="button" className="btn btn-primary" to="/register">Register</Link>
        </>
    )
}