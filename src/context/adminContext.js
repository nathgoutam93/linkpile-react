import React, { createContext, useContext, useReducer, useEffect } from "react";
import PropTytpes from "prop-types";
import { initialState, adminReducer } from "../reducers/adminReducer";
import { useFirestore } from "../context/firestoreContext";

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const { userData } = useFirestore();
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    if (userData) {
      dispatch({
        type: "field",
        field: "username",
        value: userData.username || state.username,
      });
      dispatch({
        type: "field",
        field: "imgSrc",
        value: userData.page.imgSrc || state.imgSrc,
      });
      dispatch({
        type: "field",
        field: "profileName",
        value: userData.page.profileName || state.profileName,
      });
      dispatch({
        type: "field",
        field: "about",
        value: userData.page.about || state.about,
      });
      dispatch({
        type: "field",
        field: "appearance",
        value: userData.page.appearance || state.appearance,
      });
      dispatch({
        type: "field",
        field: "socials",
        value: userData.page.socials || state.socials,
      });
      dispatch({
        type: "field",
        field: "links",
        value: userData.page.links || state.links,
      });
    }
  }, [userData]);

  const value = { state, dispatch };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTytpes.element,
};
