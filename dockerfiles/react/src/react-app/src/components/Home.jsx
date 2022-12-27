import React from "react";
import InitComment from "./InitComment";
import ClickSendButton from "./ClickSendButton";



import "../App.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom"

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
      textAlign: "center"
    }
  })
);

export const Home = () => {
    
    const classes = useStyles();
    const navigate = useNavigate()

    return (
        <div>

            <div className={classes.root}>
                <AppBar position="static" >
                    <Toolbar>
                    
                    <Typography variant="h6" className={classes.title}>
                        Q-bo
                    </Typography>
                    <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                </div>

            {/* <div className={style.home}>
                <Link to="/login">Login</Link>
            </div> */}

            <InitComment />
            <ClickSendButton />
        </div>
    );
  };


  
