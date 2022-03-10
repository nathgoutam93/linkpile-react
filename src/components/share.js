import React, { useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import PropTypes from "prop-types";
import ShareModal from "./shareModal";
export default function Share({ username }) {
  const handleShare = () => {
    setShowModal(!showModal);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full px-4 p-2 flex justify-around items-center space-x-2 bg-white dark:bg-secondary lg:border border-gray-300 dark:border-border-dark lg:rounded-xl">
        <a
          href={`https://linkpile-bffd7.web.app/${username}`}
          className="flex-1 text-sm text-gray-700 dark:text-gray-50 truncate hover:underline"
        >{`https://linkpile-bffd7.web.app/${username}`}</a>

        <FaRegShareSquare
          size={24}
          className="text-gray-600 dark:text-gray-400 cursor-pointer"
          onClick={handleShare}
        />
      </div>
      {showModal ? (
        <div
          onClick={() => setShowModal(!showModal)}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
        >
          <ShareModal username={username} />
        </div>
      ) : null}
    </>
  );
}

Share.propTypes = {
  username: PropTypes.string.isRequired,
};
