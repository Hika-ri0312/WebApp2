import React from 'react'
import { useState, useEffect, useContext,useCallback } from "react";
import { BrowserRouter, Link, Routes, Route, useParams, useLocation } from "react-router-dom";
// import { useRoute } from '@react-navigation/native'
import { getMonth } from "../util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"
import style from "./Calendar.module.css"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal, daySelected, setShowEventModal, savedEvents, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);
    const [req, setReq] = React.useState([]);
    const location = useLocation();
    const [uid, setUid] = useState();
    const navigate = useNavigate()
    const classes = useStyles();

    let flag = false
    let numFlag = 0
    useEffect(() => {
        dispatchCalEvent({ type: "allDel", payload: {} })
    },[])
    useEffect(() => {
        const uidCons = location.state.email;
        setUid(uidCons);
    },[])

    useEffect(() => {
        const host = process.env.REACT_APP_IP_ADDR
        const baseURL = "http://" + host + ":10180/pyapi/calendar/get/";
        if (uid ==""){return}
        console.log(uid)
        axios.post(baseURL, {"uid":uid})
            .then(res => {
                if(res.data[1] == 400){
                    flag = false
                    return
                }
                // console.log(res)
                setReq(res.data['cont'])
            })
    },[uid]);

    useEffect(() => {
        if (numFlag == 0){
            const rows = req.map((ress,index) => {
                dispatchCalEvent({ type: "push", payload: JSON.parse(JSON.stringify(ress)) })
            });
            numFlag = 1;
        }
        setShowEventModal(false);
    }, [req]);

    useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

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
                            Calendar Page
                        </Typography>
                            <button onClick={() => navigate('/login')}>Login</button>
                        </Toolbar>
                    </AppBar>
                </div>
            {showEventModal && <EventModal email={uid}/>}
            <div className="h-screen flex flex-col">
                <CalendarHeader/>
                <div className="flex flex-1">
                
                <Month month={currentMonth} />
                
                </div>
            </div>
          </div>
    );
}
export default Calendar;
