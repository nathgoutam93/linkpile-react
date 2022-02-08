import React from 'react';

export default function ProfileCard({ imgSrc, profileName, about, dispatch }) {
  return (
    <div className="w-full p-10 pt-2 flex flex-col items-center bg-gray-100 space-y-4 rounded-3xl shadow-md">
      {imgSrc && (
        <div className="mt-4 h-32 w-32 rounded-full cursor-pointer">
          <img
            src={imgSrc}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}
      <div className="w-full space-y-1">
        <label className="text-sm">Profile Title</label>
        <input
          value={profileName}
          onChange={(e) =>
            dispatch({
              type: 'field',
              field: 'profileName',
              value: e.target.value,
            })
          }
          type="text"
          className="w-full p-4 outline-none border rounded-md"
          placeholder="Profile Name"
        ></input>
      </div>
      <div className="w-full space-y-1">
        <label className="text-sm">Profile Description</label>
        <textarea
          value={about}
          onChange={(e) =>
            dispatch({
              type: 'field',
              field: 'about',
              value: e.target.value,
            })
          }
          className="w-full p-4 outline-none border rounded-md"
          placeholder="Bio"
        ></textarea>
      </div>
    </div>
  );
}
