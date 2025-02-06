import React, { useEffect, useState, useRef } from "react";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  document.title = "SignUp";

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      toast.success("Registered Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#1c3144] w-screen h-screen flex flex-row">
      <LoadingBar color="#84b59f" ref={ref}></LoadingBar>
      <div className="left w-2/5 h-screen">
        <h1 className="text-[#ddd8c4] font-thin w-3/4 pl-10 text-7xl leading-tight relative top-1/4 left-10 whitespace-pre-wrap">
          <span className="font-medium text-[#a3c9a8]">Budget</span>
          <br></br>Flow
        </h1>
      </div>
      <hr className="w-0.5 h-3/4 mt-24 bg-[#ddd8c4]"></hr>
      <div className="flex justify-center items-center w-3/5 h-screen">
        <div className="flex flex-col gap-7 w-3/5 h-2/3 pt-20 items-center">
          <h1 className="text-4xl text-[#ddd8c4] font-bold -top-10 relative">
            SignUp
          </h1>
          <input
            placeholder="UserName"
            onChange={(e) => setUsername(e.target.value)}
            className="w-96 h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-[#ddd8c4] focus:outline-offset-4"
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-96 h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-[#ddd8c4] focus:outline-offset-4"
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-[#ddd8c4] focus:outline-offset-4"
          />
          <button
            onClick={submitForm}
            className="w-96 h-12 justify-center text-lg rounded-2xl bg-[#69a297] text-center flex items-center font-bold"
          >
            Submit
          </button>
          <p className="text-[#ddd8c4] text-lg -mt-4">
            Already Registered!! ,
            <a href="/login" className="underline text-[#a3c9a8]">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
