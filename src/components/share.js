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
      <div className="flex w-full items-center justify-around space-x-2 border-gray-300 bg-white p-2 px-4 dark:border-border-dark dark:bg-secondary lg:rounded-xl lg:border">
        <a
          href={`https://linkpile-bffd7.web.app/${username}`}
          className="flex-1 truncate text-sm text-gray-700 hover:underline dark:text-gray-50"
        >{`https://linkpile-bffd7.web.app/${username}`}</a>

        <FaRegShareSquare
          size={24}
          className="cursor-pointer text-gray-600 dark:text-gray-400"
          onClick={handleShare}
        />
      </div>
      {showModal ? (
        <div
          onClick={() => setShowModal(!showModal)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
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
