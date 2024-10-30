import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";
import logo from "../assets/Logo_AdriCoin.png";
const Header = ({ name }) => {
  return (
    <>
      <div className="hidden md:block">
        <img src={logo} alt="AdriCoin Logo" className="h-12 w-12 mr-2 " />
        {/* <h1 className="text-5xl">{name}</h1> */}
      </div>
      <div className="">
      {/* <div className="w-full"> */}
        <Search />
      </div>
      <div className="flex items-center">
        <ThemeIcon />
      </div>
    </>
  );
};

export default Header;
