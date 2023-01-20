import React from 'react'
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Link, Routes, Route, useParams, useLocation } from "react-router-dom";
// import { useRoute } from '@react-navigation/native'
import { getMonth } from "../util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";
import axios from "axios";
import dayjs from "dayjs";



const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal, daySelected, setShowEventModal, savedEvents, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);
    const [req, setReq] = React.useState([]);
    const location = useLocation();
    let current = false;
    const [email, setEmail] = useState();
    const Email = location.state.email;
    
   useEffect(() => {
        for (let i = 0; i < savedEvents.length; i++){
            const calendarEvent = {
                title: "",
                day: "",
                id: savedEvents[i].id,
                uid:"",
                dayTime:"",
            };
            const rows = req.map((ress,index) => {
                dispatchCalEvent({ type: "delete", payload: calendarEvent })
            });
        };
   },[]);
    

    useEffect(() => {
        if (current === false){
            setEmail(Email);
            // console.log(email);
            current = true;
        }
    },[Email]);
    // console.log(email);
    
    const getRequestSchedule = () =>{
        const host = process.env.REACT_APP_IP_ADDR
        const baseURL = "http://" + host + ":10180/calendar/get/";
        console.log(email);
        axios.post(baseURL, {"uid":Email})
            .then(res => {
                setReq(res.data['cont'])
            })
    }

    useEffect(() => {getRequestSchedule()}, []);
    // useEffect(() => {login()}, []);
    for (let i = 0; i < savedEvents.length; i++){
        const calendarEvent = {
            title: "",
            day: "",
            id: savedEvents[i].id,
            uid:"",
            dayTime:"",
        };
        const rows = req.map((ress,index) => {
            dispatchCalEvent({ type: "delete", payload: calendarEvent })
        });
    }
    useEffect(() => {
        if(savedEvents.length === 0){
            const rows = req.map((ress,index) => {
                dispatchCalEvent({ type: "push", payload: JSON.parse(JSON.stringify(ress)) })
            });
        }
        // savedEvents = [];
        // const rows = req.map((ress,index) => {
        //     dispatchCalEvent({ type: "push", payload: JSON.parse(JSON.stringify(ress)) })
        // });
        console.log(savedEvents);
        setShowEventModal(false);
    }, [req]);

    useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <>
            {showEventModal && <EventModal email={email}/>}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                
                <Month month={currentMonth} />
                
                </div>
            </div>
            <div>
            <Link to="/">Home</Link>
            <br />

            <Link to="/login">login</Link>
        </div>
        </>
    );
}
export default Calendar;
