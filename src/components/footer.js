import React from "react";

function Footer() {
  const current = new Date() ;
  const date = `${current.getFullYear()}` ;  
  
  return (
    <footer className="w-full h-2/6 border-t border-border-dark">
      <div className="w-full h-full p-8 bg-primary">
        <h1 className="text-5xl text-white font-nunito font-extrabold">
          Linkpile
        </h1>
        <p className="text-white">©{date} Linkpile</p>
      </div>
    </footer>
  );
}

export default Footer;
