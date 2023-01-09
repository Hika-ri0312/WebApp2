import React, {useRef, useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

let a = 0;

export const Rank_data = () => {    
    const [refl, setRefl] = React.useState([]);



    const host = process.env.REACT_APP_IP_ADDR
    const baseURL = "http://" + host + ":10180/rank_table/get/";

    
    if (a < 2){

        axios.get(baseURL)
            .then(res => {
                
                setRefl([...refl,res.data.res1,res.data.res2,res.data.res3])
            })
    }
    
    a++;

    return(refl)

}



export const columns = [
    { Header: "", accessor: "rank" },
    { Header: "過去の検索文", accessor: "sentence" },
  ];
  
// export const data = () => [
    
//     { rank: "1", sentence: "夏休みはいつからですか？" },
//     { rank: "2", sentence: "あああああああああああああああああああああああ"},
//     { rank: "3", sentence: ""}
//   ];