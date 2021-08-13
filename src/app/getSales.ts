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
 * A fetch Api that retrieves sales data from a remote api.
 *
 * @returns It is packaged into a json data format.
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
  /* const salesData=sales.sort((a, b) => parseFloat(a.sales) - parseFloat(b.sales)); */
  return Promise.resolve(sales);
}