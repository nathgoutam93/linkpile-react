import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState, adminReducer } from '../reducers/adminReducer';
import { useFirestore } from '../context/firestoreContext';

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const { userData } = useFirestore();
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    if (userData) {
      dispatch({ type: 'field', field: 'username', value: userData.username });
      dispatch({ type: 'field', field: 'imgSrc', value: userData.page.imgSrc });
      dispatch({
        type: 'field',
        field: 'profileName',
        value: userData.page.profileName,
      });
      dispatch({ type: 'field', field: 'about', value: userData.page.about });
      dispatch({
        type: 'field',
        field: 'appearance',
        value: {
          background: userData.page.appearance.background,
          linkStyle: userData.page.appearance.linkStyle,
          font: userData.page.appearance.font,
        },
      });
      dispatch({ type: 'field', field: 'links', value: userData.page.links });
    }
  }, [userData]);

  useEffect(() => {
    if (state.file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        dispatch({ type: 'field', field: 'imgSrc', value: e.target.result });
      };

      reader.readAsDataURL(state.file);
    }
  }, [state.file]);

  const value = { state, dispatch };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
