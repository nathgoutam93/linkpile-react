import React from "react";

function Footer() {
  const current = new Date();
  const date = `${current.getFullYear()}`;

  return (
    <footer className="h-2/6 w-full">
      <div className="h-full w-full bg-black p-8">
        <h1 className="font-nunito text-5xl font-extrabold text-white">
          Linkpile
        </h1>
        <p className="text-white">©{date} Linkpile</p>
      </div>
    </footer>
  );
}

export default Footer;
