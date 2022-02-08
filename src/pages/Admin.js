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
          className="px-4 py-2  text-blue-700 font-inter font-bold"
        >
          Log Out
        </button>
        <Link
          to={`${ROUTES.ADMIN}`}
          className="px-4 py-2 text-white font-inter font-bold rounded-md bg-blue-700"
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
        className={`w-full grid ${!preview && 'lg:grid-cols-2'} bg-gray-200`}
      >
        <div className={`p-4 space-y-4 pb-96 ${preview && 'hidden'}`}>
          {error && (
            <p className="text-red-700 text-base font-semibold font-inter">
              {error}
            </p>
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
          <svg
            onClick={() => setPreview(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        ) : (
          <>
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
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <svg
              onClick={handleNewLink}
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
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
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </>
        )}
      </div>
    </>
  );
}
