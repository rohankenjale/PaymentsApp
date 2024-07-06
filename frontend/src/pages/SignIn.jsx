import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { z } from "zod";

const signInSchema = z.object({
  username: z.string().min(1,"Username is required"),
  password: z.string().min(1,"Password is required"),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const result = signInSchema.safeParse({ username, password });
    if (!result.success) {
      const errors = result.error.format();
      setValidationErrors(errors);
      return;
    }

    try {
      const json = JSON.stringify({
        username: username,
        password: password,
      });
      const res = await axios.post('https://paymentsapp-backend.onrender.com/api/v1/user/signin', json, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error during signin:', error);
      setError(error.response?.data?.message || 'Signin failed');
    }
  };

  return <div className="bg-slate-900 h-screen flex justify-center">
      <div className="  flex flex-col justify-center">
        <form className=" bg-slate-800  p-10 rounded-3xl" onSubmit={handleSignIn}>
          <div className="text-white font-extrabold text-3xl text-center">
            Sign In
          </div>
          <div className="text-white text-center py-2">
            Enter your credentials to access your<br></br>account
          </div>
          <div className="my-2">
             <div className="py-1"><label htmlFor="" className="text-white font-semibold">User Name</label></div>
            <input value={username} onChange={(e)=>{setUsername(e.target.value); setValidationErrors({ ...validationErrors, username: null }); }} placeholder="username" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg  text-white"/>
            {validationErrors.username && <span className="text-red-500">{validationErrors.username._errors[0]}</span>}
          </div>
          <div className="my-2">
            <div className="py-1">
              <label htmlFor="" className="text-white font-semibold">Password</label>
            </div>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value); setValidationErrors({ ...validationErrors, password: null }); }} placeholder="password" className="w-full bg-transparent border-2 border-gray-300 p-2 rounded-lg text-white"/>
            {validationErrors.password && <span className="text-red-500">{validationErrors.password._errors[0]}</span>}
          </div>
          <button type="submit" className="my-3.5 w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="text-white text-center">
            Don't have an account? Sign Up
          </div>
        </form>
      </div>
    </div>
}