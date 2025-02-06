import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../components/Items";
import { Chartss } from "../components/Chartss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from "react-top-loading-bar";
import { createExpense, getUserExpenses } from "../utils/renders";
import NavBar from "../components/NavBar";

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem("User")));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = "Home";

  useEffect(() => {
    if (!localStorage.getItem("User")) {
      navigate("/login");
    }
    getUserExpenses(userdata._id).then((data) => setUserexp(data));
  }, [userdata._id, navigate]);

  const getTotal = () => {
    return userexp.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleCreateExpense = () => {
    const expInfo = {
      usersid: userdata._id,
      category,
      date: selectDate,
      amount,
    };
    ref.current.staticStart();
    createExpense(expInfo);
    ref.current.complete();
  };

  return (
    <div className="h-screen font-mont w-full bg-[#1c3144]">
      <LoadingBar color="#84b59f" ref={ref}></LoadingBar>
      <NavBar data={userexp}></NavBar>
      <div className="Feed w-4/5 left-[calc(100%-90%)] relative h-[calc(100%-6rem)] flex">
        <div className="leftbox w-1/2 h-full">
          <div className="p-6 h-full w-full">
            <Chartss exdata={userexp}></Chartss>
          </div>
        </div>
        <div className="rightbox flex flex-col gap-10 items-center w-1/2">
          <div className="createnew bg-[#69a297] w-auto rounded-3xl p-10 pb-6 pt-6 flex flex-col justify-center items-center gap-2 relative top-5">
            <div className="font-bold text-3xl text-[#ddd8c4] font-mont">
              Create Transaction
            </div>
            <div className="flex flex-row gap-4">
              <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
                className="h-12 w-auto text-base placeholder-black p-4 rounded-xl outline-none focus:focus-animation"
              ></input>
              <select
                onChange={(e) => setCategory(e.target.value)}
                defaultValue=""
                className="bg-white w-auto outline-none border placeholder-black border-gray-300 text-gray-900 text-sm rounded-xl block p-2.5 focus:focus-animation"
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-flow-col w-full">
              <div className="w-full">
                <DatePicker
                  selected={selectDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="p-3 placeholder-black w-2/2 rounded-xl outline-none bg-jp-black px-4 placeholder-rp-yellow h-fit text-jp-white focus:focus-animation"
                  placeholderText="Date"
                  showYearDropdown
                />
              </div>
              <button
                onClick={handleCreateExpense}
                className="relative h-fit text-center w-full rounded-xl px-5 py-2 overflow-hidden group bg-[#84b59f] text-[#ddd8c4] hover:ring-2 hover:ring-offset-2 hover:ring-[#84b59f] transition-all ease-out duration-300"
              >
                <span className="relative font-bold text-2xl">+</span>
              </button>
            </div>
          </div>
          <div className="w-5/6 p-7 relative rounded-xl h-auto border-[#ddd8c4] border-2 grid gap-7 overflow-y-scroll">
            <div className="text-3xl text-[#ddd8c4] font-bold font-mont">
              Total Expense : ₹ {getTotal()}
            </div>
            <div className="grid grid-cols-2 listrr gap-7">
              {userexp.map((item) => (
                <Items key={item._id} data={item}></Items>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
