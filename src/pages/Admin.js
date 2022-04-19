import { useEffect, useState } from "react";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/firestoreContext";
import { useHeader } from "../context/headerContext";
import { useAdmin } from "../context/adminContext";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Share from "../components/share";
import Editor from "../components/Editor";
import Appearance from "../components/appearance";
import Preview from "../components/Preview";
import {
  HiOutlineLink,
  HiOutlinePencil,
  HiOutlineUpload,
} from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";
import { BsBrush } from "react-icons/bs";

export default function Admin() {
  const { logOut } = useAuth();
  const { userData, updateProfile } = useFirestore();
  const { setCustomHeader } = useHeader();
  const { state, dispatch } = useAdmin();
  const { username, profileName, about, links, appearance, socials, loading } =
    state;

  const [preview, setPreview] = useState(false);
  const [showDesign, setShowDesign] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: "update" });

    try {
      await updateProfile(userData.userId, {
        page: {
          ...userData.page,
          profileName: profileName,
          about: about,
          links: links,
          appearance: appearance,
          socials: socials,
        },
      });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error", error: error.message });
    }
  };

  useEffect(() => {
    const customHeader = (
      <Link
        to={`${ROUTES.PROFILE}`}
        className="rounded-3xl bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent"
      >
        My Account
      </Link>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  return (
    <>
      {!preview && <Header />}
      <div className="lg:hidden">
        <Share username={username} />
      </div>

      <div
        className={`grid w-full ${
          !preview && "lg:grid-cols-2"
        } bg-gray-200 font-nunito dark:bg-primary`}
      >
        <div className={`w-full p-4  pb-96 ${preview && "hidden"}`}>
          <div className="hidden lg:flex">
            <Share username={username} />
          </div>
          {showDesign ? <Appearance /> : <Editor />}
        </div>

        <div
          className={`${
            preview ? "flex" : "hidden"
          } items-center justify-center lg:flex`}
        >
          <Preview preview={preview} />

          <div
            className={`relative ${
              preview ? "flex" : "hidden"
            } items-center justify-center lg:flex`}
          >
            {preview ? (
              <div
                onClick={() => setPreview(false)}
                className="fixed left-4 top-4 hidden cursor-pointer items-center justify-center space-x-1 rounded-3xl border border-gray-300 bg-white p-4 hover:bg-gray-300 dark:border-border-dark  dark:bg-secondary dark:hover:bg-secondary-accent lg:flex"
              >
                <HiOutlinePencil
                  size={23}
                  className="text-gray-800 dark:text-gray-400"
                />
                <span className="font-nunito text-2xl text-gray-800 dark:text-white">
                  Editor
                </span>
              </div>
            ) : (
              <div className="cursor-pointe fixed top-24 hidden items-center space-x-1 rounded-3xl border border-gray-300 bg-white p-4 dark:border-border-dark dark:bg-secondary lg:flex">
                {showDesign ? (
                  <div
                    onClick={() => setShowDesign(false)}
                    className="flex cursor-pointer items-center space-x-2 rounded-xl p-2 hover:bg-gray-300 dark:hover:bg-border-dark"
                  >
                    <HiOutlineLink
                      size={25}
                      className="text-gray-800 dark:text-gray-400"
                    />
                    <span className="font-nunito text-lg text-gray-800 dark:text-white">
                      Links
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowDesign(true)}
                    className="flex cursor-pointer items-center space-x-2 rounded-xl p-2 hover:bg-gray-300 dark:hover:bg-border-dark"
                  >
                    <BsBrush
                      size={25}
                      className="text-gray-800 dark:text-gray-400"
                    />
                    <span className="font-nunito text-lg text-gray-800 dark:text-white">
                      Design
                    </span>
                  </div>
                )}
                <div
                  onClick={() => setPreview(true)}
                  className="flex cursor-pointer items-center space-x-2 rounded-xl p-2 hover:bg-gray-300 dark:hover:bg-border-dark"
                >
                  <AiOutlineEye
                    size={25}
                    className="text-gray-800 dark:text-gray-400"
                  />
                  <span className="font-nunito text-lg text-gray-800 dark:text-white">
                    Preview
                  </span>
                </div>
                <div
                  disabled={loading}
                  onClick={handleUpdate}
                  className="flex cursor-pointer items-center space-x-2 rounded-xl p-2 hover:bg-gray-300 dark:hover:bg-border-dark"
                >
                  {loading ? (
                    <ImSpinner
                      size={25}
                      className="animate-spin text-gray-800 dark:text-gray-400"
                    />
                  ) : (
                    <HiOutlineUpload
                      size={25}
                      className="text-gray-800 dark:text-gray-400"
                    />
                  )}
                  <span className="font-nunito text-lg text-gray-800 dark:text-white">
                    {loading ? "Saving" : "Save"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-3xl border border-border-dark bg-white p-4 dark:bg-secondary lg:hidden">
        {preview ? (
          <div
            onClick={() => setPreview(false)}
            className="flex cursor-pointer items-center justify-center  space-x-1"
          >
            <HiOutlinePencil
              size={45}
              className="text-gray-800 dark:text-gray-50"
            />
            <span className="font-nunito text-2xl text-gray-800 dark:text-white">
              Editor
            </span>
          </div>
        ) : (
          <>
            {showDesign ? (
              <div
                onClick={() => setShowDesign(false)}
                className="flex cursor-pointer flex-col items-center justify-center"
              >
                <HiOutlineLink
                  size={45}
                  className="text-gray-800 dark:text-gray-50"
                />
                <span className="font-nunito text-lg text-gray-800 dark:text-gray-50">
                  Links
                </span>
              </div>
            ) : (
              <div
                onClick={() => setShowDesign(true)}
                className="flex cursor-pointer flex-col items-center justify-center"
              >
                <BsBrush
                  size={45}
                  className="text-gray-800 dark:text-gray-50"
                />
                <span className="font-nunito text-lg text-gray-800 dark:text-gray-50">
                  Design
                </span>
              </div>
            )}
            <div
              onClick={() => setPreview(true)}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <AiOutlineEye
                size={45}
                className="text-gray-800 dark:text-gray-50"
              />
              <span className="font-nunito text-lg text-gray-800 dark:text-gray-50">
                Preview
              </span>
            </div>
            <div
              disabled={loading}
              onClick={handleUpdate}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              {loading ? (
                <ImSpinner size={45} className="animate-spin" />
              ) : (
                <HiOutlineUpload
                  size={45}
                  className="text-gray-800 dark:text-gray-50"
                />
              )}
              <span className="font-nunito text-lg text-gray-800 dark:text-gray-50">
                {loading ? "Saving" : "Save"}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
