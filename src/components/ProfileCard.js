<<<<<<< 1
import React from "react";
import { useFirestore } from "../context/firestoreContext";
import { BsCamera } from "react-icons/bs";
=======
import React from 'react';
import { useAdmin } from '../context/adminContext';
import { useFirestore } from '../context/firestoreContext';
>>>>>>> master

export default function ProfileCard() {
  const { userData } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { file, imgSrc, profileName, about } = state;

  const handleFile = (event) => {
    event.preventDefault();

    dispatch({ type: "field", field: "file", value: event.target.files[0] });
  };

  const handleCancel = () => {
    dispatch({ type: "field", field: "imgSrc", value: userData.page.imgSrc });
    dispatch({ type: "field", field: "file", value: null });
  };

  const handleRemove = () => {
    dispatch({ type: "field", field: "imgSrc", value: null });
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
          <div className="p-6 h-32 w-32 rounded-full border">
            <BsCamera className="h-full w-full" />
          </div>
        )}
        <div className="flex-1 flex justify-center items-center space-x-1">
          {file ? (
            <button
              onClick={handleCancel}
              className="text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center hover:bg-rose-300"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className="text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center hover:bg-rose-300"
            >
              Remove
            </button>
          )}
          <label className="text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer hover:bg-rose-300">
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
              type: "field",
              field: "profileName",
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
              type: "field",
              field: "about",
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
