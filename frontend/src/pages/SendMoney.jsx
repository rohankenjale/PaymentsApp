import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const[amount,setAmount] = useState(0);
    
    return <div className="bg-slate-900 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <form className=" bg-slate-800  p-10 rounded-3xl">
        <div className="text-white font-semibold text-5xl text-center my-5">
            Send Money
        </div>
      <div className="my-5">
          <div className="py-5"><label htmlFor="" className="text-white font-normal text-2xl">{name}</label></div>
          <div className="py-1.5"><label htmlFor="" className="text-white font-normal text-2xl">Amount (in Rs) </label></div>
          <input onChange={(e)=>{
            setAmount(e.target.value)
          }} placeholder="Enter Amount"  type = "number" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-xl text-white"/>
      </div>
      <button onClick={(e)=>{
        e.preventDefault(); 
        const res = axios.post('https://paymentsapp-backend.onrender.com/api/v1/account/transfer',{
            to:id,
            amount
                } ,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
        navigate(-1)
      }} className="my-3.5 w-full text-white bg-green-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send</button>
    </form>
    </div>
    </div>
}