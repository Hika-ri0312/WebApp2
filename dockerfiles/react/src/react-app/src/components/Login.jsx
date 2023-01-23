import axios from 'axios'
import { Home } from "./Home";
import { useNavigate, BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: "#388e3c",
      backgroundColor: "#81c784"
    },
    //menuButton: {
      //marginRight: theme.spacing(2)
    //},
    title: {
      flexGrow: 1,
      textAlign: "center",
      fontFamily: "MS 明朝"
    }
  })
);

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    let isLoggedIn = "";
    const [ERROR, setError] = useState({styleDisplay: 'none', innerText: ""});
    const [SUCCESS, setSuccess] = useState({styleDisplay: 'none', innerText: ""});
    const handleSubmit = (e) => {
        e.preventDefault();
        const host = process.env.REACT_APP_IP_ADDR
        const baseURL = "http://" + host + ":10180/api/login";
        //const baseURL = "http://express:18080/api/login";
        axios.post(baseURL, {
            "email": e.target[0].value,
            "password": e.target[1].value,
        })
        .then(res => {
            if(res.data.status == "error"){
                isLoggedIn = false;
                if (isLoggedIn == false){
                    setError({styleDisplay: isLoggedIn ? 'none' : 'block', innerText: res.data.error });
                    setSuccess({styleDisplay: isLoggedIn ? 'block' : 'none', innerText: res.data.success });
                }
            } else {
                isLoggedIn = true;
                if (isLoggedIn == true){
                    setError({styleDisplay: isLoggedIn ? 'none' : 'block', innerText: res.data.error });
                    setSuccess({styleDisplay: isLoggedIn ? 'block' : 'none', innerText: res.data.success });
                    navigate('/loading', {
                        state: {email : e.target[0].value}
                });
                }
                
            }
        })
    }

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
                <div className={classes.root}>
                    <AppBar position="static" >
                        <Toolbar>
                            <button onClick={() => navigate('/')}>Home</button>
                            <Typography variant="h6" className={classes.title}>
                                Login Page
                            </Typography>
                                <button onClick={() => navigate('/register')}>Register</button>
                        </Toolbar>
                    </AppBar>
                </div>
            <div className="container my-5">
                <div className="card" style={{width: '100%'}}>
                    <div className="card-body">
                        <h5 className="card-title">Login form</h5>
                        <form onSubmit={handleSubmit} id="form">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">User ID</label>
                                <input className="form-control" id="email" autoComplete="off" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" autoComplete="off" required />
                            </div>
                            
                            <div className="alert alert-danger" role="alert" id="error" style={{display: ERROR.styleDisplay}}>{ERROR.innerText}</div>
                            <div className="alert alert-success" role="alert" id="success" style={{display: SUCCESS.styleDisplay}}>{SUCCESS.innerText}</div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};
export default Login
