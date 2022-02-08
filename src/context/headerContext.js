import React, { useState, createContext, useContext } from 'react';

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
