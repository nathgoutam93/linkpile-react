import React, { useEffect } from "react";
import { useAdmin } from "../context/adminContext";
import { useFirestore } from "../context/firestoreContext";
import { BsPersonFill } from "react-icons/bs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import InputFieldSimple from "./commons/inputFieldSimple";

export default function ProfileCard() {
  const { userData, updateProfile, storage } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { imgFile, imgSrc, profileName, about, loading } = state;

  const handleFile = (event) => {
    event.preventDefault();

    dispatch({ type: "field", field: "imgFile", value: event.target.files[0] });
  };

  const handleCancel = () => {
    dispatch({ type: "field", field: "imgSrc", value: userData.page.imgSrc });
    dispatch({ type: "field", field: "imgFile", value: null });
  };

  const handleRemove = async () => {
    dispatch({ type: "field", field: "imgSrc", value: null });

    await updateProfile(userData.userId, {
      page: { ...userData.page, imgSrc: null },
    });
  };

  const handleUpload = () => {
    dispatch({ type: "update" });

    if (imgFile) {
      const imgFileStorageRef = ref(storage, `users/${userData.username}`);
      const imgFileUploadTask = uploadBytesResumable(
        imgFileStorageRef,
        imgFile,
      );

      imgFileUploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
        },
        (error) => {
          console.log(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(
              imgFileUploadTask.snapshot.ref,
            );
            await updateProfile(userData.userId, {
              page: { ...userData.page, imgSrc: downloadURL },
            });
            dispatch({ type: "success" });
          } catch (error) {
            dispatch({ type: "error", error: error.message });
          }
        },
      );
    }
  };

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        dispatch({ type: "field", field: "imgSrc", value: e.target.result });
      };

      reader.readAsDataURL(imgFile);
    }
  }, [imgFile]);

  return (
    <div className="w-full p-10 pt-2 flex flex-col items-center bg-secondary space-y-4 rounded-xl border border-border-dark">
      <div className="mt-4 w-full flex flex-col lg:flex-row justify-around items-center space-x-4 space-y-2">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt=""
            className="w-32 h-32 rounded-full object-cover border border-border-dark"
          />
        ) : (
          <div className="p-6 h-32 w-32 rounded-full border border-border-dark">
            <BsPersonFill className="h-full w-full text-gray-400" />
          </div>
        )}
        <div className="flex-1 flex justify-center items-center space-x-1">
          {imgFile ? (
            <>
              <button
                onClick={handleCancel}
                className="w-full text-white bg-primary-accent font-medium rounded-xl text-sm px-5 py-2 text-center hover:bg-secondary-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="w-full text-white bg-primary-accent font-medium rounded-xl text-sm px-5 py-2 text-center hover:bg-secondary-accent"
              >
                {loading ? "Uploading" : "Upload"}
              </button>
            </>
          ) : (
            <>
              <button
                disabled={!imgSrc}
                onClick={handleRemove}
                className="w-full text-white bg-primary-accent font-medium rounded-xl text-sm px-5 py-2 text-center hover:bg-secondary-accent"
              >
                Remove
              </button>
              <label className="w-full text-white bg-primary-accent font-medium rounded-xl text-sm px-5 py-2 text-center cursor-pointer hover:bg-secondary-accent">
                Change
                <input
                  className="hidden"
                  aria-label="profile pic"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFile}
                />
              </label>
            </>
          )}
        </div>
      </div>
      <div className="w-full space-y-1">
        <InputFieldSimple
          label="Profile Title"
          value={profileName}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "profileName",
              value: e.target.value,
            })
          }
          placeholder="your name"
        />
      </div>
      <div className="w-full space-y-1">
        <label className="text-sm text-white font-nunito">
          Profile Description
        </label>
        <textarea
          value={about}
          onChange={(e) =>
            dispatch({
              type: "field",
              field: "about",
              value: e.target.value,
            })
          }
          className="w-full p-2 px-4 bg-primary text-white outline-none rounded-md"
          placeholder="Bio"
        ></textarea>
      </div>
    </div>
  );
}
