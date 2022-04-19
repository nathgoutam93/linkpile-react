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
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-300 bg-white p-4 dark:border-secondary dark:bg-primary">
      <Link
        to="/"
        className="flex bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400 bg-clip-text font-nunito text-2xl font-extrabold text-transparent"
      >
        {/* <img
          className="w-8 mr-2 h-full"
          src="./images/LogoNeon.png"
          alt="Link Pile Logo"
        /> */}
        Link.pile
      </Link>
      <div className="flex items-center justify-center space-x-4">
        {customHeader}
        {dark ? (
          <BsFillMoonStarsFill
            size={25}
            className="cursor-pointer text-border-dark"
            onClick={handleDark}
          />
        ) : (
          <MdLightMode
            size={25}
            className="cursor-pointer text-border-dark"
            onClick={handleDark}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
