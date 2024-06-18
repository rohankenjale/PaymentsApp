import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";

export const SignUp = () => {
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSignUp = async ()=>{
            try {
                const json = JSON.stringify({
                    firstname:firstname,
                    lastname:lastname,
                    username:username,
                    password:password,
                });
                const res = await axios.post('http://localhost:3000/api/v1/user/signup', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
            localStorage.setItem("token",res.data.token)
            navigate("/dashboard", { state: { firstname } })
            } catch (error) {
                console.error('Error during signup:', error);
                setError(error.response?.data?.message || 'Signup failed');
            };
    }
    return <div className="bg-slate-900 h-screen flex justify-center">
    <div className="  flex flex-col justify-center">
    <form className=" bg-slate-800  p-10 rounded-3xl" onSubmit={(e) => { e.preventDefault(); handleSignUp()}}>
        <div className="text-white font-extrabold text-3xl text-center">
            Sign Up
        </div>
        <div className="text-white text-center py-2">
            Enter your information to create your<br></br>account
        </div>
      <div className="my-2">
          <div className="py-1"><label htmlFor="" className="text-white font-semibold">First Name</label></div>
          <input value={firstname} onChange={(val)=>{ setFirstname(val.target.value)}} placeholder="firstname" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
      </div>
      <div className="my-2">
          <div className="py-1"><label htmlFor="" className="text-white font-semibold">Last Name</label></div>
          <input value={lastname} onChange={(val)=>{ setLastname(val.target.value)}} placeholder="lastname" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg  text-white"/>
      </div>
      <div className="my-2">
          <div className="py-1"><label htmlFor="" className="text-white font-semibold">User Name</label></div>
          <input value={username} onChange={(val)=>{ setUsername(val.target.value)}} placeholder="username" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
      </div>
      <div className="my">
          <div className="py-1"><label htmlFor="" className="text-white font-semibold"> Password </label></div>
          <input value={password} onChange={(val)=>{ setPassword(val.target.value)}} placeholder="password" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
      </div>
      <button type="submit" className="my-3.5 w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
      <div className="text-white text-center">
        Already have an account? Login
      </div>
    </form>
    </div>
    </div>
    
    
 }