import React from 'react';
import { Link } from 'react-router-dom';
import { useHeader } from '../context/headerContext';

function Header() {
  const { customHeader } = useHeader();

  return (
    <header className="sticky top-0 w-full p-4 flex justify-between items-center bg-white border-b z-10">
      <Link
        to="/"
        className="text-2xl font-nunito font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400"
      >
        Link.pile
      </Link>
      {customHeader}
    </header>
  );
}

export default Header;
