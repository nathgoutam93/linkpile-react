import { useEffect, useReducer } from 'react';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useHeader } from '../context/headerContext';
import { initialState, loginReducer } from '../reducers/loginReducer';
import { Link } from 'react-router-dom';
import Header from '../components/header';

export default function Login() {
  const { login } = useAuth();
  const { setCustomHeader } = useHeader();

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, error, loading } = state;

  const invalid = email === '' || password === '';

  const handleLogIn = async (event) => {
    event.preventDefault();

    dispatch({ type: 'login' });

    try {
      await login(email, password);
    } catch (error) {
      dispatch({ type: 'error', error: error.message });
    }
  };

  useEffect(() => {
    setCustomHeader(null);

    return () => dispatch({ type: 'field', field: 'loading', value: false });
  }, [setCustomHeader]);

  return (
    <div className="w-full h-full bg-gray-100">
      <Header />
      <div className="w-full h-screen p-4 lg:p-10 flex flex-col justify-center items-center">
        <form className="p-4 lg:p-10 flex flex-col justify-center items-center font-nunito space-y-4 bg-white rounded-3xl border">
          <p className="text-red-700 text-base font-semibold font-nunito">
            {error}
          </p>
          <h1>Login to your Linkpile account</h1>
          <div className="w-full flex flex-col space-y-4">
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
              onClick={handleLogIn}
              className={`px-4 py-2 text-white font-nunito font-bold rounded-md ${
                invalid ? 'bg-gray-400' : 'bg-rose-400 hover:bg-rose-300'
              } ${loading && 'animate-pulse'}`}
            >
              Log In
            </button>
          </div>
          <Link
            to={ROUTES.REGISTER}
            className="mt-6 text-lg text-gray-700 font-nunito font-semibold hover:underline"
          >
            Dont have an account? create one
          </Link>
        </form>
      </div>
    </div>
  );
}
