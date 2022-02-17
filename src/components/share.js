import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import PropTypes from "prop-types";

export default function Share({ username }) {
  const handleShare = () => {
    navigator.clipboard.writeText(`https://linkpile-bffd7.web.app/${username}`);
  };

  return (
    <div className="w-full px-4 p-2 flex justify-around items-center space-x-2 lg:bg-gray-100 lg:shadow-inner lg:rounded-lg">
      <a
        href={`https://linkpile-bffd7.web.app/${username}`}
        className="text-sm text-gray-700 truncate underline"
      >{`https://linkpile-bffd7.web.app/${username}`}</a>

      <IoCopyOutline
        size={24}
        onClick={handleShare}
        className="text-gray-700 cursor-pointer"
      />
    </div>
  );
}

Share.propTypes = {
  username: PropTypes.string.isRequired,
};
