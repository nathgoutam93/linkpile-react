import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { HiShare } from "react-icons/hi";
import PropTypes from "prop-types";
import Modal from "./modal";
export default function Share({ username }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://linkpile-bfd7.web.app/${username}`);
  };
  const handleShare = () => {
    setShowModal(!showModal);
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? <Modal username={username} /> : null}
      <div className="w-full px-4 p-2 flex justify-around items-center space-x-2 lg:bg-gray-100 lg:shadow-inner lg:rounded-lg">
        <a
          href={`https://linkpile-bffd7.web.app/${username}`}
          className="text-sm text-gray-700 truncate underline"
        >{`https://linkpile-bffd7.web.app/${username}`}</a>

        <IoCopyOutline
          size={24}
          onClick={handleCopy}
          className="text-gray-700 cursor-pointer"
        />
        <HiShare size={24} onClick={handleShare} />
      </div>
    </>
  );
}

Share.propTypes = {
  username: PropTypes.string.isRequired,
};
