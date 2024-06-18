import {useLocation, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { useEffect } from "react";

export const Dashboard = () => {
    const [data,setData] = useState([]);
    const [balance,setBalance]=useState(0);
    const [filter,setFilter] = useState("");
    const [firstname,setFirstname]= useState("")
    const navigate = useNavigate()
    const getUsers = async ()=>{

        const res = await axios.get('http://localhost:3000/api/v1/user/users?filter='+filter,{
            headers : {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        const balres = await axios.get('http://localhost:3000/api/v1/account/balance',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setBalance(balres.data.balance)
        setData(res.data.user)
        setFirstname(res.data.firstname)
}
  
    useEffect(() => {
        getUsers();
    }, [])

    
    return <div className="h-screen bg-slate-900">
    <div className="bg-slate-700 flex justify-between border-b-4 border-slate-500 p-3">
         <div className="text-white font-bold text-3xl text-center">Payments App</div>
         <div className="text-white text-center py-2"> Hello, {firstname} </div>
    </div>
    <div className="text-white  pt-6 py-3 px-6">Your Balance {balance}</div>
    <div className="text-white  py-3 px-6">Users</div>
    <div className="flex mx-3 my-3 ">
        <input
            type="text"
            className="block w-full px-4 py-2 text-white bg-transparent border-2 border-slate-500 rounded-md mr-2 ml-3"
            placeholder="Search..."
            onChange={(e)=>{setFilter(e.target.value)}}
        />
        <button onClick={async ()=>{
            const res = await axios.get('http://localhost:3000/api/v1/user/users?filter='+filter)
            console.log(res.data.user)
            setData(res.data.user)
        }}
        className="px-4 text-white bg-purple-700  rounded ">
            Search
        </button>
    </div>
    {data?.map((item)=>{
        return <div className="bg-slate-800  flex justify-between m-6 p-3 rounded-lg">
            <div className="text-white text-center py-2">{item.username}</div>
            <button onClick={()=>{
                navigate("/send?id=" + item.id + "&name=" + item.firstname)
            }} className="my-3.5  text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Money</button>
        </div>
    })}
    </div>
 }
