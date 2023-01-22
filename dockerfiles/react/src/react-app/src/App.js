import React from "react";
import { createContext,useContext,useState,useRef} from "react";

// react-router-domのインポートを追加
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import Login from "./components/Login";

import Calendar from "./components/Calendar";
import Register from "./components/register";
import Loading from "./components/Loading";




function App() {
    return (

        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/calendar' element={<Calendar/>} />
                    <Route path='/loading' element={<Loading/>} />
                </Routes>  
            </BrowserRouter>

            
        </div>
  );
}

export default App;
