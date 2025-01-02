import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CodeforcesHandle.css"; 

const Login = () => {
  const canvasRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 3.2;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgb(57, 244, 126)";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = index * fontSize;

        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index] += 1;
        }
      });
    };

    const interval = setInterval(draw, 40);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting to backend:", data);
  
      // Make the login request to the backend
      const response = await axios.post("http://localhost:3000/api/login", {
        email: data.email,
        password: data.password,
      });
  
      console.log("Backend response:", response.data);
  
      // Check if the response contains a token
      const token = response.data.token;
      const name = response.data.name;
      const email = response.data.email;
      const codeforces = response.data.codeforces;
      const leetcode = response.data.leetcode;
      const codechef = response.data.codechef;
  
      if (token) {
        // Store the token and user info (email and codeforces) in localStorage
        localStorage.setItem("authToken", token);  // Store the JWT token
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);  // Store the email
        localStorage.setItem("userCodeforces", codeforces);  // Store the Codeforces handle
        localStorage.setItem("userleetcode", leetcode);  
        localStorage.setItem("usercodechef", codechef);  
        console.log("Token and user details successfully stored in localStorage:", token);
  
        // Navigate to the home page after login (or wherever needed)
        navigate("/"); 
      } else {
        console.error("Token not found in response");
      }
    } catch (error) {
      console.error("Error submitting data:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="landingpage">
      <form className="handle-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        
        {/* Email Field */}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Enter Email ID"
          className="form-input"
        />
        
        {/* Password Field */}
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Enter Password"
          className="form-input"
        />

        <button type="submit" className="form-button">
          Login
        </button>
      </form>

      {/* Canvas for the Matrix effect */}
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
    </div>
  );
};

export default Login;
