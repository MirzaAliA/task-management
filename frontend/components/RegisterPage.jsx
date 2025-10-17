import { Link } from "react-router-dom"
import useRegister from "../handler/registerHandler";

export default function RegisterPage() {

    const useMutation = useRegister();
    
        const handleSubmit = (e) => {
            e.preventDefault()
            const formData = {
                name: e.target[0].value,
                username: e.target[1].value,
                password: e.target[2].value
            }
            useMutation.mutate(formData)
        }

    return (
        <>
            <div className="login-outer">
                <div className="login-title">
                    <h2>Register</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label" for="inputName">Name</label>
                        <input name="name" type="text" id="inputName" className="form-control" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                        <label className="form-label" for="inputUsername">Username</label>
                        <input name="username" type="text" id="inputUsername" className="form-control" />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3 ">
                        <label className="form-label" for="inputPassword">Password</label>
                        <input name="password" type="password" id="inputPassword" className="form-control" />
                    </div>

                    {useMutation.isError && (
                        <div className="mb-3" style={{ color: 'red' }}>{useMutation.error.message}!</div>
                    )}

                    <button disabled={useMutation.isPending} type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        {useMutation.isPending ? 'Process...' : 'Register'}
                    </button>

                    <div className="text-center">
                        <p>Sudah punya akun? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}