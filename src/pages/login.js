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
    <div className="h-full w-full bg-gray-200 dark:bg-primary">
      <Header />
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 lg:p-10">
        <form className="flex w-full max-w-lg flex-col items-center justify-center space-y-4 rounded-3xl border border-gray-300 bg-white p-4 font-nunito dark:border-border-dark dark:bg-secondary lg:p-10">
          <p className="font-nunito text-base font-semibold text-rose-400">
            {error}
          </p>
          <h1 className="text-gray-800 dark:text-white">
            Login to your Linkpile account
          </h1>
          <div className="flex w-full flex-col space-y-4">
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
              className="rounded-md bg-gray-200 p-4 text-gray-800 outline-none dark:bg-primary dark:text-white"
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
              className="rounded-md bg-gray-200 p-4 text-gray-800 outline-none dark:bg-primary dark:text-white"
              placeholder="Password"
            ></input>
            <button
              disabled={invalid || loading}
              onClick={handleLogIn}
              className={`rounded-md px-4 py-2 font-nunito font-bold text-white ${
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
            className="mt-6 font-nunito text-lg font-semibold text-gray-600 hover:underline dark:text-gray-300"
          >
            Dont have an account? create one
          </Link>
          <Link
            to={ROUTES.RESET_PASSWORD}
            className="mt-6 font-nunito text-sm font-semibold text-gray-600 hover:underline dark:text-gray-300"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
}
