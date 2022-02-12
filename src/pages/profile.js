import { useState, useEffect } from 'react';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import { useFirestore } from '../context/firestoreContext';
import { useHeader } from '../context/headerContext';
import { useAuth } from '../context/authContext';

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
        loading: false,
      };
    default:
      break;
  }
}

const initialState = {
  username: '',
  email: '',
  error: '',
  loading: false,
};

export default function Profile() {
  const { setCustomHeader } = useHeader();
  const { logOut } = useAuth();
  const { userData, updateProfile } = useFirestore();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, email, error, loading } = state;

  const [isLoading, setLoading] = useState(true);

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: 'update' });

    try {
      await updateProfile(userData.userId, {
        username: username,
        email: email,
      });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error', error: error.message });
    }
  };

  useEffect(() => {
    if (userData) {
      dispatch({ type: 'field', field: 'username', value: userData.username });
      dispatch({ type: 'field', field: 'email', value: userData.email });
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    const customHeader = (
      <div className="flex justify-around items-center space-x-2">
        <button
          onClick={() => logOut()}
          className="px-4 py-2 font-inter font-bold text-rose-400 bg-gray-50 rounded-3xl hover:bg-gray-100"
        >
          Log Out
        </button>
        <Link
          to="/admin"
          className="px-4 py-2 text-white font-inter font-bold rounded-3xl bg-rose-400 hover:bg-rose-300"
        >
          Admin
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-full h-full bg-gray-200">
      <Header />
      <div className="w-full h-screen p-10 flex flex-col justify-center items-center">
        <form className="w-full p-10 flex flex-col bg-gray-100 space-y-4 rounded-3xl shadow-2xl">
          <h2 className="mb-4 text-xl font-semibold font-inter">
            Account Information
          </h2>
          {error && (
            <p className="text-red-700 text-base font-semibold font-inter">
              {error}
            </p>
          )}
          <label className="text-sm">username</label>
          <input
            value={username}
            onChange={(e) =>
              dispatch({
                type: 'field',
                field: 'username',
                value: e.target.value,
              })
            }
            type="text"
            className="w-full p-4 outline-none border rounded-md"
            placeholder="username"
          ></input>
          <label className="text-sm">email</label>
          <input
            disabled
            value={email}
            onChange={(e) =>
              dispatch({
                type: 'field',
                field: 'email',
                value: e.target.value,
              })
            }
            type="email"
            required={true}
            className="w-full p-4 outline-none border rounded-md"
            placeholder="email"
          ></input>
          <button
            disabled={loading}
            onClick={handleUpdate}
            className={`max-w-max px-4 py-2 text-white font-inter font-bold rounded-3xl bg-rose-400 hover:bg-rose-300 ${
              loading && 'animate-pulse'
            }`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
