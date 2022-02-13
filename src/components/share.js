import React from 'react';

export default function Share({ username }) {
  const handleShare = () => {
    navigator.clipboard.writeText(`https://linkpile-bfd7.web.app/${username}`);
  };

  return (
    <div className="w-full px-4 p-2 flex justify-around items-center space-x-2 lg:bg-gray-100 lg:shadow-inner lg:rounded-lg">
      <a
        href={`https://linkpile-bffd7.web.app/${username}`}
        className="text-sm text-gray-700 truncate underline"
      >{`https://linkpile-bffd7.web.app/${username}`}</a>

      <svg
        onClick={handleShare}
        className="w-8 h-8 text-gray-700 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
}
