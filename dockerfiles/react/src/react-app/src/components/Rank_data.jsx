import React, {useRef,useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

let a = 0;

export const Rank_data = () => {    
    const [refl, setRefl] = React.useState([]);
    const host = process.env.REACT_APP_IP_ADDR
    const baseURL = "http://" + host + ":10180/pyapi/rank_table/get/";
    useEffect(() => {
        axios.get(baseURL)
            .then(res => {
                setRefl([...refl,res.data.res1,res.data.res2,res.data.res3,res.data.res4,res.data.res5])
            })
    },[])
    return(refl)
}

export const columns = [
    { Header: "順位", accessor: "rank" },
    { Header: "検索文ランキング", accessor: "sentence" },
  ];
  
// export const data = () => [
    
//     { rank: "1", sentence: "夏休みはいつからですか？" },
//     { rank: "2", sentence: "あああああああああああああああああああああああ"},
//     { rank: "3", sentence: ""}
//   ];
