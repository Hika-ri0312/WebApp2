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

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal, daySelected, setShowEventModal, savedEvents, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);
    const [req, setReq] = React.useState([]);
    const location = useLocation();
    const [uid, setUid] = useState();
    const navigate = useNavigate()

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
        const baseURL = "http://" + host + ":10180/calendar/get/";
        if (uid ==""){return}
        console.log(uid)
        axios.post(baseURL, {"uid":uid})
            .then(res => {
                if(res.data[1] == 400){
                    flag = false
                    return
                }
                console.log(res)
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-brand" onClick={() => navigate('/')}>Home</button>
                    <button className="navbar-brand text-white" onClick={() => navigate('/login')}>Login</button>
                </div>
            </nav>
            {showEventModal && <EventModal email={uid}/>}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                
                <Month month={currentMonth} />
                
                </div>
            </div>
          </div>
    );
}
export default Calendar;
