// import React,{useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { loginUser } from '../api/api'; // Assuming you have an auth API module

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await loginUser( email, password );
//       navigate('/'); // Redirect to home after successful login
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: 'easeOut' }}
//         className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="text"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             onClick={handleLogin}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md"
//           >
//             Log In
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-500 mt-4">
//           Don't have an account?{' '}
//           <span
//             onClick={() => navigate('/signup')}
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Sign Up
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data.message);
        localStorage.setItem("isLoggedIn", "true"); // Save login state
        onLogin(); // Update parent state
        navigate("/"); // Redirect to homepage
      } else {
        const errorData = await response.json();
        alert("Login failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed due to a network error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-500 cursor-pointer underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
