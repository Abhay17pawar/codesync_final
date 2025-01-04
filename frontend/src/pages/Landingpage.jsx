import React, { useEffect, useRef } from "react";
import Platforms from "../components/Platforms";
import "./Landingpage.css";
import Calender from "../components/Calender";
import GetStartedButton from "../components/Getstartedbtn"; 
import TopicAnalysis from "../components/TopicAnalysis";
import Totalques from "../components/Totalques";
import Heatmap from "../components/Heatmap";
import Classification from "../components/Classification";
import Signbtn from "../components/Signupbtn";

const Landingpage = () => {
  const canvasRef = useRef(null);

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

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <div style={{ position: "relative" }}>
        <h1
          style={{
            position: "absolute",
            top: "2%",
            left: "8.3%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
            backgroundColor: "rgb(12, 11, 11)",
            padding: "6px",
            borderRadius: "10px",
          }}
          className="animated-text"
        >
          CodeSync
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "4.9%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
            backgroundColor: "rgb(12, 11, 11)",
            padding: "10px",
            borderRadius: "10px",
          }}
          className="animated-text"
        >
          Track Your Coding Progress
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "30%",
            left: "35.9%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
            backgroundColor: "rgb(12, 11, 11)",
            padding: "10px",
            borderRadius: "10px",
          }}
          className="animated-text"
        >
          Your All-in-One Coding Portfolio
        </h1>

        <div
          style={{
            position: "absolute",
            top: "10%", 
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <GetStartedButton /> 
        </div>
        <div
          style={{
            position: "absolute",
            top: "96%", 
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <Signbtn /> 
        </div>

        <h1
          style={{
            position: "absolute",
            top: "71%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
            backgroundColor: "rgb(12, 11, 11)",
            padding: "10px",
            borderRadius: "10px",
          }}
          className="animated-text"
        >
          Never Miss a Contest
        </h1>
        <h1
          style={{
            position: "absolute",
            top: "89%",
            left: "25%",
            zIndex: 1,
            backgroundColor: "rgb(12, 11, 11)",
            padding: "10px",
            borderRadius: "10px",
          }}
          className="animated-text"
        >
          Ready to Level Up Your Coding Game?
        </h1>
        <h5
          style={{
            position: "absolute",
            top: "75%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 1,
            backgroundColor: "rgb(12, 11, 11)",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "25px",
            fontWeight: "500", 
            fontStyle: "italic",
          }}
          className="animated-text"
        >
          Track coding contests and set <br></br>
          reminders with just one click.
        </h5>

        <div
          style={{
            position: "absolute",
            top: "15%", 
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(215, 233, 215)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Platforms
              title={<a href="https://codeforces.com/">CODEFORCES</a>}
              image="https://res.cloudinary.com/practicaldev/image/fetch/s--N2_RJe5R--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cer3l19eex0wy900b101.jpg"
              description="Track your progress on Codeforces and stay updated with your ratings and contest performances."
            />
          </div>

          <div
            style={{
              backgroundColor: "rgb(215, 233, 215)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Platforms
              title={<a href="https://leetcode.com/">LEETCODE</a>}
              image="https://ih1.redbubble.net/image.4319740961.7776/st,small,507x507-pad,600x600,f8f8f8.jpg"
              description="Crack interviews and land your dream job with LeetCode! Master algorithms and prepare for top tech company interviews."
            />
          </div>

          <div
            style={{
              backgroundColor: "rgb(215, 233, 215)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Platforms
              title={<a href="https://www.codechef.com/">CODECHEF</a>}
              image="https://th.bing.com/th/id/OIP.1W0-bbmt4iiEpp_pPrS0VQAAAA?w=333&h=354&rs=1&pid=ImgDetMain"
              description="Cook up your coding skills on CodeChef! Sharpen your mind and become a master coder!"
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "64%", 
            left: "65%",
            transform: "translateX(-50%)",
            zIndex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Calender />
        </div>
        <div
          style={{
            position: "absolute",
            top: "33%", 
            left: "25.4%",
            transform: "translateX(-50%)",
            zIndex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Totalques />
        </div>
        <div
          style={{
            position: "absolute",
            top: "33%",
            left: "55%",
            transform: "translateX(-50%)",
            zIndex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Heatmap />
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%", 
            left: "47%",
            transform: "translateX(-50%)",
            zIndex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <TopicAnalysis />
        </div>
        <div
          style={{
            position: "absolute",
            top: "45%", 
            left: "69%",
            transform: "translateX(-50%)",
            zIndex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Classification />
        </div>

        <canvas ref={canvasRef} className="bg-black" />
      </div>
    </div>
  );
};

export default Landingpage;
