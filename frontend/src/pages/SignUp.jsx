import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { z } from "zod";

const signUpSchema = z.object({
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().nonempty("Last name is required"),
  username: z.string().nonempty("Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignUp = () => {
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const [validationErrors, setValidationErrors] = useState({});

  const handleSignUp = async ()=>{
    try {
      const result = signUpSchema.safeParse({ firstname, lastname, username, password });
      if (!result.success) {
        const errors = result.error.format();
        setValidationErrors(errors);
        return;
      }

      const json = JSON.stringify({ firstname, lastname, username, password });
      const res = await axios.post('https://paymentsapp-backend.onrender.com/api/v1/user/signup', json, {
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials": "true",
          'Content-Type': 'application/json',
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT" ,
          "Access-Control-Allow-Headers" :"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
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
            <input value={firstname} onChange={(val)=>{ setFirstname(val.target.value); setValidationErrors({ ...validationErrors, firstname: null });}} placeholder="firstname" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
            {validationErrors.firstname && <span className="text-red-500">{validationErrors.firstname._errors[0]}</span>}
          </div>
          <div className="my-2">
            <div className="py-1">
              <label htmlFor="" className="text-white font-semibold">Last Name</label>
            </div>
            <input value={lastname} onChange={(val) => { setLastname(val.target.value); setValidationErrors({ ...validationErrors, lastname: null }); }} placeholder="lastname" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
            {validationErrors.lastname && <span className="text-red-500">{validationErrors.lastname._errors[0]}</span>}
          </div>
          <div className="my-2">
            <div className="py-1"><label htmlFor="" className="text-white font-semibold">User Name</label></div>
            <input value={username} onChange={(val)=>{ setUsername(val.target.value); setValidationErrors({ ...validationErrors, username: null }); }} placeholder="username" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
            {validationErrors.username && <span className="text-red-500">{validationErrors.username._errors[0]}</span>}
          </div>
          <div className="my-2">
            <div className="py-1">
              <label htmlFor="" className="text-white font-semibold">Password</label>
            </div>
            <input value={password} onChange={(val)=>{ setPassword(val.target.value); setValidationErrors({ ...validationErrors, password: null }); }} placeholder="password" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
            {validationErrors.password && <span className="text-red-500">{validationErrors.password._errors[0]}</span>}
          </div>
          <button type="submit" className="my-3.5 w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="text-white text-center">
            Already have an account? Login
          </div>
        </form>
      </div>
    </div>


}