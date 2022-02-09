import { useEffect, useReducer, useState } from 'react';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { useHeader } from '../context/headerContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import ProfileCard from '../components/ProfileCard';
import { Link } from 'react-router-dom';
import LinkCardEditable from '../components/LinkCardEditable';
import Page from '../components/page';
import Header from '../components/header';

function reducer(state, action) {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'update':
      return {
        ...state,
        loading: true,
        file: null,
      };
    case 'success':
      return {
        ...state,
        loading: false,
      };
    case 'error':
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
  imgSrc: '',
  profileName: '',
  about: '',
  links: null,
  appearance: {
    background: '',
    linkStyle: '',
    font: '',
  },
  error: '',
  loading: false,
};

export default function Admin() {
  const { logOut } = useAuth();
  const { userData, updateProfile, storage } = useFirestore();
  const { setCustomHeader } = useHeader();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    file,
    imgSrc,
    profileName,
    about,
    links,
    appearance,
    error,
    loading,
  } = state;

  const [preview, setPreview] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleNewLink = () => {
    dispatch({
      type: 'field',
      field: 'links',
      value: [...links, { title: '', link: '', description: '', active: true }],
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: 'update' });

    if (file) {
      const storageRef = ref(storage, `users/${userData.username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          //uploading information
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
            dispatch({ type: 'success' });
          } catch (error) {
            dispatch({ type: 'error', error: error.message });
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
        dispatch({ type: 'success' });
      } catch (error) {
        dispatch({ type: 'error', error: error.message });
      }
    }
  };

  useEffect(() => {
    if (userData) {
      dispatch({ type: 'field', field: 'imgSrc', value: userData.page.imgSrc });
      dispatch({
        type: 'field',
        field: 'profileName',
        value: userData.page.profileName,
      });
      dispatch({ type: 'field', field: 'about', value: userData.page.about });
      dispatch({
        type: 'field',
        field: 'appearance',
        value: {
          background: userData.page.appearance.background,
          linkStyle: userData.page.appearance.linkStyle,
          font: userData.page.appearance.font,
        },
      });
      dispatch({ type: 'field', field: 'links', value: userData.page.links });
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        dispatch({ type: 'field', field: 'imgSrc', value: e.target.result });
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    const customHeader = (
      <div className="flex justify-around items-center space-x-2">
        <button
          onClick={() => logOut()}
          className="px-4 py-2 text-rose-400 font-nunito font-bold"
        >
          Log Out
        </button>
        <Link
          to={`${ROUTES.ADMIN}`}
          className="px-4 py-2 text-white font-nunito font-bold rounded-md bg-rose-400"
        >
          My Account
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      {!preview && <Header />}
      <div
        className={`w-full grid ${
          !preview && 'lg:grid-cols-2'
        } bg-gray-200 font-nunito`}
      >
        <div className={`p-4 space-y-4 pb-96 ${preview && 'hidden'}`}>
          {error && (
            <p className="text-red-700 text-base font-semibold">{error}</p>
          )}
          <ProfileCard
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
              dispatch({ type: 'field', field: 'links', value: newLinks });
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
        </div>
        <div
          className={`relative ${
            preview ? 'flex' : 'hidden'
          } justify-center items-center lg:flex`}
        >
          <div
            className={`${
              preview
                ? 'w-full h-screen'
                : 'fixed top-0 w-[390px] h-[844px] scale-50'
            } flex justify-center items-center bg-gray-900 rounded-3xl shadow-2xl`}
          >
            <div
              className={`${
                preview ? 'w-full h-full' : 'w-[97%] h-[97%] rounded-3xl'
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
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4 bg-white flex justify-around items-center border rounded-t-3xl shadow-xl">
        {preview ? (
          <div
            onClick={() => setPreview(false)}
            className="flex justify-center items-center space-x-1  cursor-pointer"
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span className="text-2xl font-nunito">Editor</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <svg
                onClick={() => setPreview(true)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 cursor-pointer"
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
            <div className="flex flex-col items-center">
              <svg
                onClick={handleNewLink}
                className="h-12 w-12 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span className="text-lg font-nunito">Add Link</span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                disabled={loading}
                onClick={handleUpdate}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-12 w-12 cursor-pointer ${
                  loading && 'animate-pulse'
                }`}
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
          </>
        )}
      </div>
    </>
  );
}
