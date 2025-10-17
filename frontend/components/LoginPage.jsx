import { Link } from "react-router-dom"
import useLogin from "../handler/loginHandler";

export default function LoginPage() {

    const useMutation = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: e.target[0].value,
            password: e.target[1].value
        }
        useMutation.mutate(formData)
    }


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

                    {useMutation.isError && (
                        <div className="mb-3" style={{ color: 'red' }}>{useMutation.error.message}!</div>
                    )}

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