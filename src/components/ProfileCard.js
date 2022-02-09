import React from 'react';
import { useFirestore } from '../context/firestoreContext';

export default function ProfileCard({
  file,
  imgSrc,
  profileName,
  about,
  dispatch,
}) {
  const { userData } = useFirestore();

  const handleFile = (event) => {
    event.preventDefault();

    dispatch({ type: 'field', field: 'file', value: event.target.files[0] });
  };

  const handleCancel = () => {
    dispatch({ type: 'field', field: 'imgSrc', value: userData.page.imgSrc });
    dispatch({ type: 'field', field: 'file', value: null });
  };

  const handleRemove = () => {
    dispatch({ type: 'field', field: 'imgSrc', value: null });
  };

  return (
    <div className="w-full p-10 pt-2 flex flex-col items-center bg-gray-100 space-y-4 rounded-3xl shadow-md">
      <div className="mt-4 w-full flex flex-col lg:flex-row justify-around items-center space-x-4 space-y-2">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt=""
            className="w-32 h-32 rounded-full object-cover border"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="p-6 h-32 w-32 rounded-full border"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
        <div className="flex-1 flex justify-center items-center space-x-1">
          {file ? (
            <button
              onClick={handleCancel}
              className="text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className="text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Remove
            </button>
          )}
          <label className="text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer">
            Change
            <input
              className="hidden"
              aria-label="profile pic"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
            />
          </label>
        </div>
      </div>
      <div className="w-full space-y-1">
        <label className="text-sm font-nunito">Profile Title</label>
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
        <label className="text-sm font-nunito">Profile Description</label>
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
