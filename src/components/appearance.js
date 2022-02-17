import React, { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useAdmin } from "../context/adminContext";
import { useFirestore } from "../context/firestoreContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./appearance.css";
import { AiOutlinePicture } from "react-icons/ai";

export default function Appearance() {
  const { userData, updateProfile, storage } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { bgImgFile, appearance, loading } = state;
  const { background, backgroundColor, linkColor, linkStyle } = appearance;

  const backgroundPresetColors = [
    "#000000",
    "#212529",
    "#ff5b5b",
    "#fca311",
    "#e5e5e5",
  ];
  const linkPresetColors = [
    "#000000",
    "#212529",
    "#ff5b5b",
    "#fca311",
    "#e5e5e5",
  ];

  const fontColors = ["#fff", "#e5e5e5", "#212529", "#000"];
  const linkfontColors = ["#fff", "#e5e5e5", "#212529", "#000"];

  const handleFile = (event) => {
    event.preventDefault();

    dispatch({
      type: "field",
      field: "bgImgFile",
      value: event.target.files[0],
    });
  };

  const handleCancel = () => {
    dispatch({
      type: "field",
      field: "appearance",
      value: {
        ...appearance,
        background: userData.page.appearance.background,
      },
    });
    dispatch({ type: "field", field: "bgImgFile", value: null });
  };

  const handleRemove = async () => {
    dispatch({
      type: "field",
      field: "appearance",
      value: { ...appearance, background: null },
    });

    await updateProfile(userData.userId, {
      page: {
        ...userData.page,
        appearance: { ...userData.page.appearance, background: null },
      },
    });
  };

  const handleUpload = () => {
    dispatch({ type: "update" });

    if (bgImgFile) {
      const storageRef = ref(storage, `background/${userData.username}`);
      const uploadTask = uploadBytesResumable(storageRef, bgImgFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
        },
        (error) => {
          console.log(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(userData.userId, {
              page: {
                ...userData.page,
                appearance: {
                  ...userData.page.appearance,
                  background: downloadURL,
                },
              },
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
    if (bgImgFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        dispatch({
          type: "field",
          field: "appearance",
          value: { ...appearance, background: e.target.result },
        });
      };

      reader.readAsDataURL(bgImgFile);
    }
  }, [bgImgFile]);

  return (
    <>
      <div className="p-4 bg-gray-100 rounded-3xl space-y-2 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="picker text-center rounded-3xl">
            <HexColorPicker
              color={backgroundColor}
              onChange={(color) => {
                dispatch({
                  type: "field",
                  field: "appearance",
                  value: { ...appearance, backgroundColor: color },
                });
              }}
            />
            <div className="p-2 flex justify-around items-center">
              {backgroundPresetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="picker__swatch"
                  style={{ background: presetColor }}
                  onClick={() => {
                    dispatch({
                      type: "field",
                      field: "appearance",
                      value: {
                        ...appearance,
                        backgroundColor: presetColor,
                      },
                    });
                  }}
                />
              ))}
            </div>
            <label>Background Color</label>
          </div>
          <div className="p-2 w-full text-center rounded-3xl space-y-2">
            <div className="space-y-2">
              {background ? (
                <img
                  src={background}
                  alt=""
                  className="w-full h-fit rounded-3xl object-cover border"
                />
              ) : (
                <div className="p-6 w-full rounded-full">
                  <AiOutlinePicture size={128} />
                </div>
              )}
              <div className="flex-1 flex justify-center items-center space-x-1">
                {bgImgFile ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="w-full text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center hover:bg-rose-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      className="w-full text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center hover:bg-rose-300"
                    >
                      {loading ? "Uploading" : "Upload"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled={!background}
                      onClick={handleRemove}
                      className="w-full text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center hover:bg-rose-300"
                    >
                      Remove
                    </button>
                    <label className="w-full text-white bg-rose-400 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer hover:bg-rose-300">
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
            <label>Background Image</label>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-3xl shadow-md">
        <label>Font Color</label>
        <div className="p-2 flex space-x-4">
          {fontColors.map((presetColor) => (
            <button
              key={presetColor}
              className="picker__swatch border-2"
              style={{ background: presetColor }}
              onClick={() => {
                dispatch({
                  type: "field",
                  field: "appearance",
                  value: {
                    ...appearance,
                    fontColor: presetColor,
                  },
                });
              }}
            />
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-3xl space-y-2 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="picker text-center rounded-xl">
            <HexColorPicker
              color={linkColor}
              onChange={(color) => {
                dispatch({
                  type: "field",
                  field: "appearance",
                  value: { ...appearance, linkColor: color },
                });
              }}
            />
            <div className="p-2 flex justify-around items-center">
              {linkPresetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="picker__swatch"
                  style={{ background: presetColor }}
                  onClick={() => {
                    dispatch({
                      type: "field",
                      field: "appearance",
                      value: {
                        ...appearance,
                        linkColor: presetColor,
                      },
                    });
                  }}
                />
              ))}
            </div>
            <label>Button Color</label>
          </div>
          <div className="p-4 text-center flex flex-col justify-between items-center space-y-2">
            <div className="grid grid-cols-2 gap-1 rounded-3xl">
              <button
                onClick={() => {
                  dispatch({
                    type: "field",
                    field: "appearance",
                    value: {
                      ...appearance,
                      linkStyle: { ...linkStyle, rounded: false },
                    },
                  });
                }}
                className="p-2 bg-gray-400 rounded-lg"
              >
                Rectangular
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "field",
                    field: "appearance",
                    value: {
                      ...appearance,
                      linkStyle: { ...linkStyle, rounded: true },
                    },
                  });
                }}
                className="p-2 bg-gray-500 rounded-3xl"
              >
                Rounded
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "field",
                    field: "appearance",
                    value: {
                      ...appearance,
                      linkStyle: { ...linkStyle, filled: true },
                    },
                  });
                }}
                className={`p-2 bg-gray-500 ${
                  linkStyle.rounded ? "rounded-3xl" : "rounded-md"
                }`}
              >
                Filled
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "field",
                    field: "appearance",
                    value: {
                      ...appearance,
                      linkStyle: { ...linkStyle, filled: false },
                    },
                  });
                }}
                className={`p-2 bg-transparent ${
                  linkStyle.rounded ? "rounded-3xl" : "rounded-md"
                } border-2`}
              >
                Outline
              </button>
            </div>
            <label>Button Style</label>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-3xl shadow-md">
        <label>Button Font Color</label>
        <div className="p-2 flex space-x-4">
          {linkfontColors.map((presetColor) => (
            <button
              key={presetColor}
              className="picker__swatch border-2"
              style={{ background: presetColor }}
              onClick={() => {
                dispatch({
                  type: "field",
                  field: "appearance",
                  value: {
                    ...appearance,
                    linkFontColor: presetColor,
                  },
                });
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
