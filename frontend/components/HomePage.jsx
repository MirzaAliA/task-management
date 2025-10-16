import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <>
            <div>Home</div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </>
    )
}