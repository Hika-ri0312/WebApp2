// import React from "react";
import InitComment from "./InitComment";
import ClickSendButton from "./ClickSendButton";

import Rank_table from "./Rank_table";

import React, {useRef, useState, useContext} from "react";
import axios from "axios";


import style from "./Home.module.css"
import "../App.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

import background from "../sky.png";


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

export const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const [text, setText] = useState("");

    return (
        <div>

            <div className={classes.root}>
                <AppBar position="static" >
                    <Toolbar>
                    
                    <Typography variant="h6" className={classes.title}>
                        Q-bo
                    </Typography>
                    {/* <Button onClick={() => navigate('/register')} color="inherit">Register</Button> */}
                    <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>

            {/* <div className={style.home}>
                <Link to="/login">Login</Link>
            </div> */}

            <div style={{ backgroundImage: `url(${background})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover' ,
              height:'auto',
              minHeight:'750px'
              
              }}>
      
    
            
            
            
              <div className={style.flex_test_box}>
                <div className={style.flex_test_item}>
                    <InitComment />  

                </div>
                <div className={style.flex_test_item}>
                    <Rank_table conIn={setText}/>
                </div>
                
              </div>

              <center>
                     
                <div className={style.mesform}>
                  <ClickSendButton />
                </div>
            
              </center>
            </div >
            
        </div>
    );
  };


  
