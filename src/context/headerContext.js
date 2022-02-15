import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const HeaderContext = createContext();

export function useHeader() {
  return useContext(HeaderContext);
}

export function HeaderProvider({ children }) {
  const [customHeader, setCustomHeader] = useState(null);

  const value = { customHeader, setCustomHeader };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.element,
};
