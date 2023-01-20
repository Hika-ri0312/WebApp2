import axios from 'axios'
import { Home } from "./Home";
import { useNavigate, BrowserRouter, Link, Routes, Route } from "react-router-dom";
// import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    // const [data, setData] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const baseURL = "http://localhost:8080/api/login";
        axios.post(baseURL, {
            "email": e.target[0].value,
            "password": e.target[1].value,
        })
        .then(res => {
            // console.log(e.target[0].value);
            if (res.data.status == "error"){
                console.log("error");
            } else {
                navigate('/calendar', {
                    state: {email : e.target[0].value}
                });
                // setData(e.target[0].value);
                // console.log(data);
            }
        })
    }

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Login Page</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-brand text-white" onClick={() => navigate('/')}>Login Page</button>
                    <button className="navbar-brand text-white" onClick={() => navigate('/register')}>Register</button>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">Register</a>
                        </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
            <div className="container my-5">
                <div className="card" style={{width: '100%'}}>
                    <div className="card-body">
                        <h5 className="card-title">Login form</h5>
                        <form onSubmit={handleSubmit} id="form">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" autoComplete="off" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" autoComplete="off" required />
                            </div>
                            <div className="alert alert-danger" role="alert" id="error" style={{display: 'none'}} />
                            <div className="alert alert-success" role="alert" id="success" style={{display: 'none'}} />
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};
export default Login
