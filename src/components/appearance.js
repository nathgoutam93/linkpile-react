import React, { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useAdmin } from "../context/adminContext";
import { useFirestore } from "../context/firestoreContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function Appearance() {
  const { userData, updateProfile, storage } = useFirestore();
  const { state, dispatch } = useAdmin();
  const { bgImgFile, appearance, loading } = state;
  const { background, backgroundColor, linkColor, linkFontColor, linkStyle } =
    appearance;

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
    <div className="mt-2 space-y-4">
      <div className="space-y-2 rounded-xl border border-gray-300 bg-white p-4 dark:border-border-dark dark:bg-secondary">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="picker rounded-3xl text-center">
            <HexColorPicker
              style={{ width: "100%" }}
              color={backgroundColor}
              onChange={(color) => {
                dispatch({
                  type: "field",
                  field: "appearance",
                  value: { ...appearance, backgroundColor: color },
                });
              }}
            />
            <div className="flex items-center justify-around p-2">
              {backgroundPresetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="m-1 h-6 w-6 cursor-pointer rounded border-2"
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
            <label className="text-gray-800 dark:text-white">
              Background Color
            </label>
          </div>
          <div className="w-full space-y-2 rounded-xl text-center">
            <div className="space-y-2 p-2 pt-0">
              {background ? (
                <img
                  src={background}
                  alt=""
                  className="h-fit w-full rounded-3xl object-cover"
                />
              ) : (
                <div className="inline-flex w-full justify-center rounded-full p-6 text-gray-700">
                  <MdAddPhotoAlternate size={128} />
                </div>
              )}
              <div className="flex flex-1 items-center justify-center space-x-1">
                {bgImgFile ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="w-full rounded-xl bg-primary-accent px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-accent"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      className="w-full rounded-xl bg-primary-accent px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-accent"
                    >
                      {loading ? "Uploading" : "Upload"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      disabled={!background}
                      onClick={handleRemove}
                      className="w-full rounded-xl bg-primary-accent px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-accent"
                    >
                      Remove
                    </button>
                    <label className="w-full cursor-pointer rounded-xl bg-primary-accent px-5 py-2 text-center text-sm font-medium text-white hover:bg-primary-accent">
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
            <label className="text-gray-800 dark:text-white">
              Background Image
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-gray-300 bg-white p-4 dark:border-border-dark dark:bg-secondary">
        <label className="text-gray-800 dark:text-white">Font Color</label>
        <div className="flex space-x-4 p-2">
          {fontColors.map((presetColor) => (
            <button
              key={presetColor}
              className="m-1 h-6 w-6 cursor-pointer rounded border-2"
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

      <div className="space-y-2 rounded-xl border border-gray-300 bg-white p-4 dark:border-border-dark dark:bg-secondary">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="picker rounded-xl text-center">
            <HexColorPicker
              style={{ width: "100%" }}
              color={linkColor}
              onChange={(color) => {
                dispatch({
                  type: "field",
                  field: "appearance",
                  value: { ...appearance, linkColor: color },
                });
              }}
            />
            <div className="flex items-center justify-around p-2">
              {linkPresetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="m-1 h-6 w-6 cursor-pointer rounded border-2"
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
            <label className="text-gray-800 dark:text-white">
              Button Color
            </label>
          </div>
          <div className="flex flex-col items-center justify-between space-y-2 p-4 text-center">
            <div className="grid w-full grid-cols-2 gap-1 rounded-xl">
              <button
                style={{ backgroundColor: linkColor, color: linkFontColor }}
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
                className="rounded-lg bg-gray-700 p-2 text-white"
              >
                Rectangular
              </button>
              <button
                style={{ backgroundColor: linkColor, color: linkFontColor }}
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
                className="rounded-3xl bg-gray-700 p-2 text-white"
              >
                Rounded
              </button>
              <button
                style={{ backgroundColor: linkColor, color: linkFontColor }}
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
                className={`bg-gray-700 p-2 text-white ${
                  linkStyle.rounded ? "rounded-3xl" : "rounded-md"
                }`}
              >
                Filled
              </button>
              <button
                style={{ borderColor: linkColor }}
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
                className={`bg-transparent p-2 text-gray-600 ${
                  linkStyle.rounded ? "rounded-3xl" : "rounded-md"
                } border-2`}
              >
                Outline
              </button>
            </div>
            <label className="text-gray-800 dark:text-white">
              Button Style
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-gray-300 bg-white p-4 dark:border-border-dark dark:bg-secondary">
        <label className="text-gray-800 dark:text-white">
          Button Font Color
        </label>
        <div className="flex space-x-4 p-2">
          {linkfontColors.map((presetColor) => (
            <button
              key={presetColor}
              className="m-1 h-6 w-6 cursor-pointer rounded border-2"
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
    </div>
  );
}
