import React from 'react'
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
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
    const getRequestSchedule = () =>{
        const host = process.env.REACT_APP_IP_ADDR
        const baseURL = "http://" + host + ":10180/calendar/get/";
        axios.post(baseURL, {"uid":"1"})
            .then(res => {
                setReq(res.data['cont'])
            })
    }

    useEffect(() => {getRequestSchedule()}, []);
    useEffect(() => {
        if(savedEvents.length === 0){
            const rows = req.map((ress,index) => {
                dispatchCalEvent({ type: "push", payload: JSON.parse(JSON.stringify(ress)) })
            });
        }
        setShowEventModal(false);
    }, [req]);

    useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
  
    return (
        <>
            {showEventModal && <EventModal />}
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
