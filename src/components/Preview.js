import React from "react";
import { useAdmin } from "../context/adminContext";
import Page from "./page";
import PropTypes from "prop-types";
import { useFirestore } from "../context/firestoreContext";

export default function Preview({ preview }) {
  const { userData } = useFirestore();
  const { state } = useAdmin();
  const { imgSrc, profileName, about, links, appearance, socials } = state;

  return (
    <div
      className={`${
        preview
          ? "h-full min-h-screen w-full"
          : "fixed top-0 h-[844px] w-[390px] scale-50 p-4 px-3"
      } flex items-center justify-center rounded-3xl bg-gray-400 dark:bg-gray-800`}
    >
      {!userData ? (
        <div className="shine h-full w-full rounded-3xl"></div>
      ) : (
        <Page
          styleClasses={`w-full h-full pt-10 p-4 flex flex-col items-center space-y-2 overflow-y-auto s_hide ${
            preview ? "" : "rounded-3xl"
          } `}
          username={userData.username}
          imgSrc={imgSrc}
          profileName={profileName}
          about={about}
          links={links}
          appearance={appearance}
          socials={socials}
        />
      )}
    </div>
  );
}

Preview.propTypes = {
  preview: PropTypes.bool.isRequired,
};
