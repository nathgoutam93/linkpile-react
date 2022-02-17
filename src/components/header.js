import React from "react";
import { Link } from "react-router-dom";
import { useHeader } from "../context/headerContext";
import Logo from "../images/LogoNeon.png";

function Header() {
  const { customHeader } = useHeader();

  return (
    <header className="sticky top-0 w-full p-4 flex justify-between items-center bg-white border-b z-10">
      <Link
        to="/"
        className="text-2xl ml-5 font-nunito flex font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400"
      >
        {/* This is the Logo */}
        <img
          className="w-14 mr-2 h-full"
          src={Logo}
          alt="Link Pile Logo"
        />{" "}
        <p className="mt-6">Link.pile</p>
      </Link>
      {customHeader}
    </header>
  );
}

export default Header;
