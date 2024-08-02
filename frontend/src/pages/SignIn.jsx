import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const json = JSON.stringify({ username, password });
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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#080710]">
      <div className="absolute inset-0">
        <div className="absolute w-52 h-52 bg-gradient-to-r from-[#1845ad] to-[#23a2f6] rounded-full -left-20 -top-20"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-tl-full -right-0 -bottom-0"></div>
      </div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form className="w-96 bg-white bg-opacity-[0.13] p-10 rounded-2xl backdrop-blur-md border-2 border-white border-opacity-10 shadow-2xl" onSubmit={handleSignIn}>
          <h3 className="text-2xl font-semibold text-center text-white">Sign In</h3>
          <div className="text-center text-white mt-4">Enter your credentials to access your account</div>
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-white font-medium">User Name</label>
              <input 
                value={username} 
                onChange={(e) => { setUsername(e.target.value); setValidationErrors({ ...validationErrors, username: null }); }} 
                placeholder="Username" 
                id="username" 
                className="w-full mt-2 p-2 bg-white bg-opacity-[0.07] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {validationErrors.username && <span className="text-red-500 text-sm mt-1">{validationErrors.username._errors[0]}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-white font-medium">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => { setPassword(e.target.value); setValidationErrors({ ...validationErrors, password: null }); }} 
                placeholder="Password" 
                id="password" 
                className="w-full mt-2 p-2 bg-white bg-opacity-[0.07] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {validationErrors.password && <span className="text-red-500 text-sm mt-1">{validationErrors.password._errors[0]}</span>}
            </div>
            <button type="submit" className="w-full py-3 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign In</button>
            {error && <div className="text-red-500 text-center text-sm mt-4">{error}</div>}
            <div className="text-center text-white mt-4">
              Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
