import { Link, useNavigate } from "react-router-dom"
import useLogin from "../handler/loginHandler";
import { useEffect } from "react";

export default function LoginPage() {

    const useMutation = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        useMutation.mutate(data)
    }

    // useEffect(() => {
    //     fetch("http://localhost:3000/api/v1/auth/check", { credentials: "include" })
    //         .then(res => res.json())
    //         .then(console.log)
    //         .catch(console.error);
    // }, [])

    return (
        <>
            <div className="login-outer">
                <div className="login-title">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label">Username</label>
                        <input name="username" type="text" id="inputUsername" className="form-control" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3 ">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" id="inputPassword" className="form-control" />
                    </div>

                    <button disabled={useMutation.isPending} type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        {useMutation.isPending ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="text-center">
                        <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}