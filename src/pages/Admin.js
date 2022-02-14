<<<<<<< 1
import { useEffect, useReducer, useState } from "react";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/firestoreContext";
import { useHeader } from "../context/headerContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import ProfileCard from "../components/ProfileCard";
import { Link } from "react-router-dom";
import LinkCardEditable from "../components/LinkCardEditable";
import Page from "../components/page";
import Header from "../components/header";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineLink, HiOutlinePencil } from "react-icons/hi";
import { BsUpload } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

function reducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "update":
      return {
        ...state,
        loading: true,
        file: null,
      };
    case "success":
      return {
        ...state,
        loading: false,
        file: null,
      };
    case "error":
      return {
        ...state,
        error: action.error,
      };
    default:
      break;
  }
}

const initialState = {
  file: null,
  username: "",
  imgSrc: "",
  profileName: "",
  about: "",
  links: null,
  appearance: {
    background: "",
    linkStyle: "",
    font: "",
  },
  error: "",
  loading: false,
};
=======
import { useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useHeader } from '../context/headerContext';
import { useAdmin } from '../context/adminContext';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Share from '../components/share';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { useFirestore } from '../context/firestoreContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
>>>>>>> master

export default function Admin() {
  const { logOut } = useAuth();
  const { userData, updateProfile, storage } = useFirestore();
  const { setCustomHeader } = useHeader();
  const { state, dispatch } = useAdmin();
  const {
    file,
    username,
    imgSrc,
    profileName,
    about,
    links,
    appearance,
    loading,
  } = state;

  const [preview, setPreview] = useState(false);
<<<<<<< 1
  const [isLoading, setLoading] = useState(true);

  const handleNewLink = () => {
    dispatch({
      type: "field",
      field: "links",
      value: [...links, { title: "", link: "", description: "", active: true }],
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://linkpile-bfd7.web.app/${username}`);
  };
=======
  const [progress, setProgress] = useState(0);
>>>>>>> master

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: "update" });

    if (file) {
      const storageRef = ref(storage, `users/${username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          try {
            await updateProfile(userData.userId, {
              page: {
                imgSrc: downloadURL,
                profileName: profileName,
                about: about,
                links: links,
                appearance: appearance,
              },
            });
<<<<<<< 1
            dispatch({ type: "success" });
=======
            setProgress(0);
            dispatch({ type: 'success' });
>>>>>>> master
          } catch (error) {
            dispatch({ type: "error", error: error.message });
          }
        }
      );
    } else {
      try {
        await updateProfile(userData.userId, {
          page: {
            imgSrc: imgSrc,
            profileName: profileName,
            about: about,
            links: links,
            appearance: appearance,
          },
        });
        dispatch({ type: "success" });
      } catch (error) {
        dispatch({ type: "error", error: error.message });
      }
    }
  };

  useEffect(() => {
<<<<<<< 1
    if (userData) {
      dispatch({ type: "field", field: "username", value: userData.username });
      dispatch({ type: "field", field: "imgSrc", value: userData.page.imgSrc });
      dispatch({
        type: "field",
        field: "profileName",
        value: userData.page.profileName,
      });
      dispatch({ type: "field", field: "about", value: userData.page.about });
      dispatch({
        type: "field",
        field: "appearance",
        value: {
          background: userData.page.appearance.background,
          linkStyle: userData.page.appearance.linkStyle,
          font: userData.page.appearance.font,
        },
      });
      dispatch({ type: "field", field: "links", value: userData.page.links });
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        dispatch({ type: "field", field: "imgSrc", value: e.target.result });
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
=======
>>>>>>> master
    const customHeader = (
      <div className="flex justify-around items-center space-x-2">
        <button
          onClick={() => logOut()}
          className="px-4 py-2 text-rose-400 font-nunito font-bold rounded-3xl bg-gray-50 hover:bg-gray-100"
        >
          Log Out
        </button>
        <Link
          to={`${ROUTES.PROFILE}`}
          className="px-4 py-2 text-white font-nunito font-bold rounded-3xl bg-rose-400 hover:bg-rose-300"
        >
          My Account
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  return (
    <>
      {!preview && <Header />}
<<<<<<< 1
      <div className="px-4 p-2 flex justify-around items-center space-x-2 lg:hidden">
        <a
          href={`https://linkpile-bffd7.web.app/${username}`}
          className="text-sm text-gray-700 truncate underline"
        >{`https://linkpile-bffd7.web.app/${username}`}</a>

        <IoCopyOutline
          size={23}
          className=" text-gray-700 cursor-pointer"
          onClick={handleShare}
        />
=======
      {!progress ? null : (
        <div className="w-full h-1 text-xs flex bg-purple-200">
          <div className="progress flex flex-col shadow-none text-center whitespace-nowrap text-white justify-center bg-blue-500">
            <style>{`.progress{width: ${progress}%}`}</style>
          </div>
        </div>
      )}
      <div className="lg:hidden">
        <Share username={username} />
>>>>>>> master
      </div>

      <div
<<<<<<< 1
        className={`w-full grid ${
          !preview && "lg:grid-cols-2"
        } bg-gray-200 font-nunito`}
      >
        <div className={`w-full p-4  pb-96 ${preview && "hidden"} space-y-4`}>
          {error && (
            <p className="text-red-700 text-base font-semibold">{error}</p>
          )}
          <div className="px-4 p-2 hidden lg:flex justify-around items-center bg-gray-300 rounded-lg space-x-2 shadow-inner">
            <a
              href={`https://linkpile-bffd7.web.app/${username}`}
              className=" text-gray-700 runcate underline"
            >{`https://linkpile-bffd7.web.app/${username}`}</a>

            <IoCopyOutline
              onClick={handleShare}
              className="w-8 h-8 text-gray-700 cursor-pointer"
            />
          </div>
          <ProfileCard
            file={file}
            imgSrc={imgSrc}
            profileName={profileName}
            about={about}
            dispatch={dispatch}
          />

          <DragDropContext
            onDragEnd={(param) => {
              const srcI = param.source.index;
              const desI = param.destination?.index;
              const newLinks = [...links];
              const draggeditem = newLinks.splice(srcI, 1);
              newLinks.splice(desI, 0, ...draggeditem);
              dispatch({ type: "field", field: "links", value: newLinks });
            }}
          >
            <Droppable droppableId="dropable-1">
              {(provided, _) => (
                <div
                  key="dropable-1"
                  className="w-full flex flex-col space-y-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {links?.map((link, index) => {
                    return (
                      <LinkCardEditable
                        key={link.title || index}
                        id={index}
                        Link={link}
                        links={links}
                        dispatch={dispatch}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="hidden lg:flex justify-around items-center space-x-4">
            <button
              onClick={handleNewLink}
              className="w-full px-5 py-2 flex justify-center items-center text-white bg-rose-400 rounded-xl space-x-4 hover:bg-rose-300"
            >
              <HiOutlineLink size={25} />
              <span className="text-lg font-nunito">Add Link</span>
            </button>
            <button
              disabled={loading}
              onClick={handleUpdate}
              className="w-full px-5 py-2 flex justify-center items-center text-white bg-rose-400 rounded-xl space-x-4 hover:bg-rose-300"
            >
              <BsUpload
                size={21}
                className={` cursor-pointer ${loading && "animate-pulse"}`}
              />
              <span className="text-lg font-nunito">Save</span>
            </button>
=======
        className={`relative w-full grid ${
          !preview && 'lg:grid-cols-2'
        } bg-gray-200 font-nunito`}
      >
        <div className={`w-full p-4  pb-96 ${preview && 'hidden'} space-y-4`}>
          <div className="hidden lg:flex">
            <Share username={username} />
>>>>>>> master
          </div>
          <Editor />
        </div>

        <div
<<<<<<< 1
          className={`relative ${
            preview ? "flex" : "hidden"
          } justify-center items-center lg:flex`}
        >
          {preview ? (
            <div
              onClick={() => setPreview(false)}
              className="fixed left-4 top-4 p-4 hidden lg:flex justify-center items-center space-x-1 bg-gray-100 rounded-3xl  cursor-pointer hover:bg-gray-50"
            >
              <HiOutlinePencil size={23} />
              <span className="text-2xl font-nunito">Editor</span>
            </div>
          ) : (
            <div
              className="fixed top-20 p-4 hidden lg:flex items-center space-x-1 bg-gray-100 rounded-3xl cursor-pointer hover:bg-gray-50"
              onClick={() => setPreview(true)}
            >
              <AiOutlineEye size={25} />
              <span className="text-lg font-nunito">Preview</span>
            </div>
          )}
          <div
            className={`${
              preview
                ? "w-full h-screen"
                : "fixed top-0 w-[390px] h-[844px] scale-50"
            } flex justify-center items-center bg-gray-900 rounded-3xl shadow-2xl`}
          >
            <div
              className={`${
                preview ? "w-full h-full" : "w-[97%] h-[97%] rounded-3xl"
              } flex flex-col items-center bg-gray-700 space-y-1 overflow-y-auto s_hide`}
            >
              <Page
                imgSrc={imgSrc}
                profileName={profileName}
                about={about}
                links={links}
                appearance={appearance}
              />
            </div>
=======
          className={`${
            preview ? 'flex' : 'hidden'
          } justify-center items-center lg:flex`}
        >
          <Preview preview={preview} />

          <div
            className={`relative ${
              preview ? 'flex' : 'hidden'
            } justify-center items-center lg:flex`}
          >
            {preview ? (
              <div
                onClick={() => setPreview(false)}
                className="fixed left-4 top-4 p-4 hidden lg:flex justify-center items-center space-x-1 bg-gray-100 rounded-3xl  cursor-pointer hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span className="text-2xl font-nunito">Editor</span>
              </div>
            ) : (
              <div className="fixed top-20 p-4 hidden lg:flex items-center space-x-1 bg-gray-100 rounded-3xl cursor-pointe">
                <div
                  onClick={() => setPreview(true)}
                  className="flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-3xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-lg font-nunito">Preview</span>
                </div>
                <div
                  disabled={loading}
                  onClick={handleUpdate}
                  className={`flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-3xl ${
                    loading && 'animate-pulse'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <span className="text-lg font-nunito">Save</span>
                </div>
              </div>
            )}
>>>>>>> master
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4 bg-white flex justify-around items-center border rounded-t-3xl lg:hidden">
        {preview ? (
          <div
            onClick={() => setPreview(false)}
            className="flex justify-center items-center space-x-1  cursor-pointer "
          >
            <HiOutlinePencil size={45} />

            <span className="text-2xl font-nunito">Editor</span>
          </div>
        ) : (
          <>
<<<<<<< 1
            <div className="flex flex-col items-center  ">
              <AiOutlineEye
                size={45}
                className=" cursor-pointer"
                onClick={() => setPreview(true)}
              />

              <span className="text-lg font-nunito">Preview</span>
            </div>
            <div className="flex flex-col items-center">
              <HiOutlineLink
                size={45}
                className="cursor-pointer"
                onClick={handleNewLink}
              />
              <span className="text-lg font-nunito">Add Link</span>
            </div>
            <div className="flex flex-col items-center">
              <BsUpload
                size={40}
                disabled={loading}
                onClick={handleUpdate}
                className={`h-12 w-12 cursor-pointer ${
                  loading && "animate-pulse"
                }`}
              />
=======
            <div
              onClick={() => setPreview(true)}
              className="flex flex-col lg:flex-row items-center space-x-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-lg font-nunito">Preview</span>
            </div>
            <div
              disabled={loading}
              onClick={handleUpdate}
              className={`flex flex-col lg:flex-row items-center space-x-2 cursor-pointer ${
                loading && 'animate-pulse'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
>>>>>>> master
              <span className="text-lg font-nunito">Save</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
