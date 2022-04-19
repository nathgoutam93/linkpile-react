import React, { createContext, useContext, useEffect, useState } from "react";
import PropTytpes from "prop-types";

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark") ?? true),
  );

  useEffect(() => {
    if (dark) {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, []);

  const value = { dark, setDark };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTytpes.element,
};
