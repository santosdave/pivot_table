/* import React, {useEffect,useState} from "react"; */
import {Sales} from "./Sales"
import sales from "./sales.json";

/**
 * Retrieves the sales to aggregate in the pivot table.
 *
 * @returns A promise that resolves with the orders.
 */
export async function getSales(): Promise<Sales[]> {
  /**
 * Retrieves the sales to aggregate in the pivot table.
 *
 * @returns A promise that resolves with the orders.
 */


  /* const url="https://drive.google.com/file/d/1bTfHnEUAo6VrJQTX8uJTl_VACioUNcbt/view";
  const [sales, setSales]=useState([]);
  useEffect(() =>{
    const fetchData=async ()=>{
      const res=await fetch(url);
      const json= await res.json();
      setSales(json.hits)
    };
    fetchData();
  },[setSales]);
  function async() {
    throw new Error("Function not implemented.");
  } */
  return Promise.resolve(sales);
}