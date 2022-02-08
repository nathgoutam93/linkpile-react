import { useEffect, useReducer } from 'react';
import * as ROUTES from '../constants/routes';
import { useHeader } from '../context/headerContext';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';
import { initialState, registerReducer } from '../reducers/registerReducer';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header';

export default function Register() {
  const { setCustomHeader } = useHeader();
  const { signup } = useAuth();
  const { createUser } = useFirestore();

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { username, email, password, error, loading } = state;

  const invalid = username === '' || email === '' || password === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    dispatch({ type: 'register' });

    try {
      const { user } = await signup(email, password);
      await createUser(user.uid, username, email);
      dispatch({ type: 'success' });
      navigate(ROUTES.ADMIN);
    } catch (error) {
      dispatch({ type: 'error', error: error.message });
    }
  };

  useEffect(() => {
    setCustomHeader(null);
  }, [setCustomHeader]);

  return (
    <div className="w-full h-full bg-gray-100">
      <Header />
      <div className="w-full h-screen p-10 flex flex-col justify-center items-center">
        <form className="p-10 flex flex-col justify-center items-center space-y-4 bg-white rounded-3xl border">
          <p className="text-red-700 text-base font-semibold font-inter">
            {error}
          </p>
          <h1>Create your Linkpile account for free</h1>
          <div className="w-full flex flex-col space-y-4">
            <div className="px-4 flex items-center bg-gray-100 rounded-md space-x-1">
              <span className="font-inter font-semibold">Link.pile/</span>
              <input
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: 'field',
                    field: 'username',
                    value: e.target.value,
                  })
                }
                className="p-4 bg-gray-100 outline-none"
                placeholder="yourname"
              ></input>
            </div>
            <input
              value={email}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  field: 'email',
                  value: e.target.value,
                })
              }
              type="email"
              className="p-4 outline-none bg-gray-100 rounded-md"
              placeholder="Email"
            ></input>
            <input
              value={password}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  field: 'password',
                  value: e.target.value,
                })
              }
              type="password"
              className="p-4 outline-none bg-gray-100 rounded-md"
              placeholder="Password"
            ></input>
            <button
              disabled={invalid || loading}
              onClick={handleSignUp}
              className={`px-4 py-2 text-white font-inter font-bold rounded-md ${
                invalid ? 'bg-gray-400' : 'bg-blue-700'
              } ${loading && 'animate-pulse'}`}
            >
              Sign Up
            </button>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="mt-6 text-lg font-inter font-semibold"
          >
            Already on Linkpile? Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
