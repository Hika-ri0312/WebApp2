import "./Loading.module.css"
import { useNavigate, useLocation, BrowserRouter, Link, Routes, Route } from "react-router-dom";
import {React, createContext,useContext,useEffect,useState,useRef} from 'react'
import GlobalContext from "../context/GlobalContext";
import ReactLoading from "react-loading";

const Loading = () =>{
    const [state, setState] = useState(false);
    const [uid, setUid] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const {dispatchCalEvent} = useContext(GlobalContext);

    setTimeout(() => {setState(true)}, 2000);
    useEffect(() => {
        const uidCons = location.state.email;
        setUid(uidCons);
    },[])

    useEffect(() => {
        dispatchCalEvent({ type: "allDel", payload: {} })
    },[])

    useEffect(() => {
        if (state == true){
            navigate('/calendar', {
                state: {email : uid}
            });
            setState(false)
        }
    },[state])

    return(
        <section className="flex justify-center items-center h-screen">
            <div>
                <ReactLoading
                    type="spokes"
                    color="#ebc634"
                    height="100px"
                    width="100px"
                    className="mx-auto"
                />
                <p className="text-center mt-3">Now loading...</p>
            </div>
        </section>
    );
};


export default Loading;

