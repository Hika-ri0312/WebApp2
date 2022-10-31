import React from "react";
import { createContext,useContext,useState,useRef} from "react";
import InitComment from "./InitComment";
import ClickSendButton from "./ClickSendButton";


function App() {
    return (
        <div>
            <InitComment />
            <ClickSendButton />
        </div>
    );
}

export default App;
