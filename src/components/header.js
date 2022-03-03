import React from "react";
import { Link } from "react-router-dom";
import { useHeader } from "../context/headerContext";
import { useDarkMode } from "../context/darkModeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";

function Header() {
  const { customHeader } = useHeader();
  const { dark, setDark } = useDarkMode();

  const handleDark = () => {
    if (dark) {
      window.document.documentElement.classList.remove("dark");
    } else {
      window.document.documentElement.classList.add("dark");
    }
    localStorage.setItem("dark", JSON.stringify(!dark));
    setDark(!dark);
  };

  return (
    <header className="sticky top-0 w-full p-4 flex justify-between items-center bg-white dark:bg-primary border-b border-gray-300 dark:border-secondary z-10">
      <Link
        to="/"
        className="text-2xl font-nunito flex font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400"
      >
        {/* <img
          className="w-8 mr-2 h-full"
          src="./images/LogoNeon.png"
          alt="Link Pile Logo"
        /> */}
        Link.pile
      </Link>
      <div className="flex justify-center items-center space-x-4">
        {customHeader}
        {dark ? (
          <BsFillMoonStarsFill
            size={25}
            className="text-border-dark cursor-pointer"
            onClick={handleDark}
          />
        ) : (
          <MdLightMode
            size={25}
            className="text-border-dark cursor-pointer"
            onClick={handleDark}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
