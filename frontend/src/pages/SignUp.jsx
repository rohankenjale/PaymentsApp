import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { z } from "zod";

const signUpSchema = z.object({
  firstname: z.string().min(1,"First name is required"),
  lastname: z.string().min(1,"Last name is required"),
  username: z.string().min(1,"Username is required"),
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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#080710]">
      <div className="absolute inset-0">
        <div className="absolute w-52 h-52 bg-gradient-to-r from-[#1845ad] to-[#23a2f6] rounded-full -left-20 -top-20"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-tl-full -right-0 -bottom-0"></div>
      </div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form className="w-96 bg-white bg-opacity-[0.13] p-10 rounded-2xl backdrop-blur-md border-2 border-white border-opacity-10 shadow-2xl" onSubmit={(e) => { e.preventDefault(); handleSignUp()}}>
          <h3 className="text-2xl font-semibold text-center text-white">Sign Up</h3>
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="firstname" className="block text-white font-medium">First Name</label>
              <input 
                value={firstname} 
                onChange={(val)=>{ setFirstname(val.target.value); setValidationErrors({ ...validationErrors, firstname: null });}} 
                placeholder="First name" 
                id="firstname" 
                className="w-full mt-2 p-2 bg-white bg-opacity-[0.07] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-red-500 text-sm mt-1">{validationErrors.firstname && validationErrors.firstname._errors[0]}</div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-white font-medium">Last Name</label>
              <input 
                value={lastname} 
                onChange={(val) => { setLastname(val.target.value); setValidationErrors({ ...validationErrors, lastname: null }); }} 
                placeholder="Last name" 
                id="lastname" 
                className="w-full mt-2 p-2 bg-white bg-opacity-[0.07] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-red-500 text-sm mt-1">{validationErrors.lastname && validationErrors.lastname._errors[0]}</div>
            </div>
            <div>
              <label htmlFor="username" className="block text-white font-medium">User Name</label>
              <input 
                value={username} 
                onChange={(val)=>{ setUsername(val.target.value); setValidationErrors({ ...validationErrors, username: null }); }} 
                placeholder="Username" 
                id="username" 
                className="w-full mt-2 p-2 bg-white bg-opacity-[0.07] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-red-500 text-sm mt-1">{validationErrors.username && validationErrors.username._errors[0]}</div>
            </div>
            <div>
              <label htmlFor="password" className="block text-white font-medium">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(val)=>{ setPassword(val.target.value); setValidationErrors({ ...validationErrors, password: null }); }} 
                placeholder="Password" 
                id="password" 
                className="w-full mt-2 p-2 bg-white bg-opacity-[0.07] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-red-500 text-sm mt-1">{validationErrors.password && validationErrors.password._errors[0]}</div>
            </div>
            <button type="submit" className="w-full py-3 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
            <div className="text-red-500 text-center text-sm mt-4">{error}</div>
            <div className="text-center text-white mt-4">
              Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
