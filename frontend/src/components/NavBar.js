import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsSendFill } from "react-icons/bs";
import { sendEmail } from "../utils/renders";
import LoadingBar from "react-top-loading-bar";

function NavBar(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const ref = useRef(null);

  const userData = props.data;

  const navigate = useNavigate();
  const logoutHandle = async () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem("User");
      toast.success("Logout Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <LoadingBar color="#84b59f" ref={ref}></LoadingBar>
      <div className="flex flex-row justify-between w-screen h-24 bg-[#50808e]">
        <div className="left text-[#ddd8c4] font-bold font-Handjet tracking-wider text-6xl top-5 left-10 relative">
          <p className="text-[#ddd8c4]">
            <span className="text-[#a3c9a8]">Budget</span> Flow
          </p>
        </div>

        <div className="flex flex-row justify-end w-1/3">
          <div className="pl-4 mr-16 pr-4 w-auto rounded-xl mt-6 mb-6">
            <div
              className="relative z-50 inline-flex group"
              onClick={() => setIsPressed(!isPressed)}
            >
              <div className="absolute transition-all duration-700 opacity-70 inset-16 bg-gradient-to-r from-[#84b59f] via-[#69a297] to-[#50808e] rounded-xl blur-lg group-hover:opacity-100 group-hover:inset-1 group-hover:duration-200 animate-tilt"></div>
              <div
                title=""
                className="relative inline-flex items-center justify-center px-8 py-4 text-sm tracking-wider font-bold text-[#ddd8c4] transition-all duration-200 bg-[#50808e] font-pj rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#84b59f]"
                role="button"
              >
                Send Email
              </div>
            </div>
            {
              <>
                <div
                  className={`flex flex-col overflow-hidden ${
                    isPressed
                      ? "opacity-100 mt-8 w-1/4"
                      : "opacity-0 ml-20 w-0 -mt-10"
                  } justify-between transition-all duration-500 h-50 bg-[#69a297] gap-3 absolute p-3 z-40 -ml-48 rounded-xl`}
                >
                  <div
                    className="text-[#ddd8c4] absolute -inset-x-2 -inset-y-2 bg-[#50808e] font-bold rounded-full w-6 pt-0.5 text-center left-0.5 top-1 cursor-pointer h-fit border-2"
                    onClick={() => setIsPressed(!isPressed)}
                  >
                    <p className="-mt-1">x</p>
                  </div>
                  <div className="flex flex-row gap-3 justify-between">
                    <input
                      placeholder="Your Email"
                      onChange={(e) => setUserEmail(e.target.value)}
                      type="email"
                      className="outline-none p-2 pl-4 w-full rounded-2xl"
                    />
                    <button
                      onClick={() => sendEmail(userEmail, userData)}
                      className="rounded-xl w-fit bg-[#50808e] p-3 text-2xl text-[#ddd8c4]"
                    >
                      <BsSendFill />
                    </button>
                  </div>
                  <p className="text-xs text-center text-[#ddd8c4] whitespace-nowrap">
                    **Get your expenses in <b>one month</b>, On Your Email
                  </p>
                </div>
              </>
            }
          </div>

          <div>
            <a
              onClick={logoutHandle}
              href="#_"
              className="text-xl mt-5 mb-5 right-10 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#ddd8c4] transition duration-300 ease-out border-2 border-[#a3c9a8] rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-[#ddd8c4] duration-300 -translate-x-full bg-[#a3c9a8] group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-[#a3c9a8] transition-all duration-300 transform group-hover:translate-x-full ease">
                LogOut
              </span>
              <span className="relative invisible">LogOut</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
