import {React,createContext} from "react";
import { useTable } from "react-table";
import { columns,Rank_data } from "./Rank_data";
import "./Rank_table.module.css";

export default function Rank_table() { 
  var rank_data = Rank_data()
  var data = [
    { rank: "1", sentence: rank_data[0]},
    { rank: "2", sentence: rank_data[1]},
    { rank: "3", sentence: rank_data[2]}
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
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


