import { useEffect, useReducer } from "react";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/authContext";
import { useHeader } from "../context/headerContext";
import { initialState, loginReducer } from "../reducers/loginReducer";
import { Link } from "react-router-dom";
import Header from "../components/header";

export default function Login() {
  const { login } = useAuth();
  const { setCustomHeader } = useHeader();

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, error, loading } = state;

  const invalid = email === "" || password === "";

  const handleLogIn = async (event) => {
    event.preventDefault();

    dispatch({ type: "login" });

    try {
      await login(email, password);
    } catch (error) {
      const message = error.message
        .split(/(?<=\/)(.*?)(?=\))/gm)[1]
        .replace(/-/g, " ");
      dispatch({ type: "error", error: message });
    }
  };

  useEffect(() => {
    setCustomHeader(null);

    return () => dispatch({ type: "field", field: "loading", value: false });
  }, [setCustomHeader]);

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-primary">
      <Header />
      <div className="w-full h-screen p-4 lg:p-10 flex flex-col justify-center items-center">
        <form className="w-full max-w-lg p-4 lg:p-10 flex flex-col justify-center items-center font-nunito space-y-4 bg-white dark:bg-secondary border-gray-300 dark:border-border-dark rounded-3xl border">
          <p className="text-rose-400 text-base font-semibold font-nunito">
            {error}
          </p>
          <h1 className="text-gray-800 dark:text-white">
            Login to your Linkpile account
          </h1>
          <div className="w-full flex flex-col space-y-4">
            <input
              value={email}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "email",
                  value: e.target.value,
                })
              }
              type="email"
              className="p-4 text-gray-800 dark:text-white outline-none bg-gray-200 dark:bg-primary rounded-md"
              placeholder="Email"
            ></input>
            <input
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.target.value,
                })
              }
              type="password"
              className="p-4 text-gray-800 dark:text-white outline-none bg-gray-200 dark:bg-primary rounded-md"
              placeholder="Password"
            ></input>
            <button
              disabled={invalid || loading}
              onClick={handleLogIn}
              className={`px-4 py-2 text-white font-nunito font-bold rounded-md ${
                invalid
                  ? "bg-gray-400 dark:bg-gray-800"
                  : "bg-primary-accent hover:bg-secondary-accent"
              } ${loading && "animate-pulse"}`}
            >
              Log In
            </button>
          </div>
          <Link
            to={ROUTES.REGISTER}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-nunito font-semibold hover:underline"
          >
            Dont have an account? create one
          </Link>
          <Link
            to={ROUTES.RESET_PASSWORD}
            className="mt-6 text-sm text-gray-600 dark:text-gray-300 font-nunito font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
}
