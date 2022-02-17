import React from "react";
import { useAdmin } from "../context/adminContext";
import Page from "./page";
import PropTypes from "prop-types";
import { useFirestore } from "../context/firestoreContext";

export default function Preview({ preview }) {
  const { userData } = useFirestore();
  const { state } = useAdmin();
  const { imgSrc, profileName, about, links, appearance } = state;

  return (
    <div
      className={`${
        preview ? "w-full h-screen" : "fixed top-0 w-[390px] h-[844px] scale-50"
      } flex justify-center items-center bg-gray-900 rounded-3xl shadow-2xl`}
    >
      <div
        className={`dark ${
          preview ? "w-full h-full" : "w-[96%] h-[96%] rounded-3xl"
        } flex flex-col items-center bg-gray-700 overflow-y-auto s_hide`}
      >
        {!userData ? (
          <div className="shine w-full h-full"></div>
        ) : (
          <Page
            imgSrc={imgSrc}
            profileName={profileName}
            about={about}
            links={links}
            appearance={appearance}
          />
        )}
      </div>
    </div>
  );
}

Preview.propTypes = {
  preview: PropTypes.bool.isRequired,
};
