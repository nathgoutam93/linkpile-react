import { useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { useHeader } from '../context/headerContext';
import { useAdmin } from '../context/adminContext';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Share from '../components/share';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { HiOutlinePencil } from 'react-icons/hi';
import { HiOutlineUpload } from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';

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
  const [progress, setProgress] = useState(0);

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: 'update' });

    if (file) {
      const storageRef = ref(storage, `users/${userData.username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
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
      {!progress ? null : (
        <div className="w-full h-1 text-xs flex bg-purple-200">
          <div className="progress flex flex-col shadow-none text-center whitespace-nowrap text-white justify-center bg-blue-500">
            <style>{`.progress{width: ${progress}%}`}</style>
          </div>
        </div>
      )}
      <div className="lg:hidden">
        <Share username={username} />
      </div>

      <div
        className={`w-full grid ${
          !preview && 'lg:grid-cols-2'
        } bg-gray-200 font-nunito`}
      >
        <div className={`w-full p-4  pb-96 ${preview && 'hidden'} space-y-4`}>
          <div className="hidden lg:flex">
            <Share username={username} />
          </div>
          <Editor />
        </div>

        <div
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
                <HiOutlinePencil size={23} />
                <span className="text-2xl font-nunito">Editor</span>
              </div>
            ) : (
              <div className="fixed top-20 p-4 hidden lg:flex items-center space-x-1 bg-gray-100 rounded-3xl cursor-pointe">
                <div
                  onClick={() => setPreview(true)}
                  className="flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-3xl"
                >
                  <AiOutlineEye size={25} />
                  <span className="text-lg font-nunito">Preview</span>
                </div>
                <div
                  disabled={loading}
                  onClick={handleUpdate}
                  className={`flex p-2 items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-3xl ${
                    loading && 'animate-pulse'
                  }`}
                >
                  <HiOutlineUpload size={25} />
                  <span className="text-lg font-nunito">Save</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4 bg-white flex justify-around items-center border rounded-t-3xl lg:hidden">
        {preview ? (
          <div
            onClick={() => setPreview(false)}
            className="flex justify-center items-center space-x-1  cursor-pointer"
          >
            <HiOutlinePencil size={45} />
            <span className="text-2xl font-nunito">Editor</span>
          </div>
        ) : (
          <>
            <div
              onClick={() => setPreview(true)}
              className="flex flex-col items-center space-x-2 cursor-pointer"
            >
              <AiOutlineEye size={45} />
              <span className="text-lg font-nunito">Preview</span>
            </div>
            <div
              disabled={loading}
              onClick={handleUpdate}
              className={`flex flex-col items-center space-x-2 cursor-pointer ${
                loading && 'animate-pulse'
              }`}
            >
              <HiOutlineUpload size={45} />
              <span className="text-lg font-nunito">Save</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
