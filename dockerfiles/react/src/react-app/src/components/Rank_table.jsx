import { useTable } from "react-table";
import { columns,Rank_data } from "./Rank_data";
import React from "react"
import {createContext,useContext,useEffect,useState,useRef} from 'react'
import { UserMess } from '../App'
import axios from "axios"
import "./Rank_table.module.css";

export default function Rank_table(props) { 
    const rank_data = Rank_data()

    const get_ranktable_post = (cell) =>{
        props.conIn(cell.value)
    }


    const data = [
        { rank: "1", sentence: rank_data[0]},
        { rank: "2", sentence: rank_data[1]},
        { rank: "3", sentence: rank_data[2]},
        { rank: "4", sentence: rank_data[3]},
        { rank: "5", sentence: rank_data[4]}
    ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    if(cell.value == 1 | cell.value == 2 | cell.value == 3 | cell.value == 4 | cell.value == 5 | cell.value == ""){
                                        if(cell.value == ""){
                                            return(
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                    ---
                                                </td>
                                            )

                                        }else{
                                            return(
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            )
                                        }
                                    }else{
                                        return (
                                            <td 
                                                onClick={() => get_ranktable_post(cell)}
                                                {...cell.getCellProps()}
                                            >
                                                <button type="button">{cell.value}</button>
                                            </td>
                                        )
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


