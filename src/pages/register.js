import { useEffect, useReducer } from "react";
import * as ROUTES from "../constants/routes";
import { useHeader } from "../context/headerContext";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../context/firestoreContext";
import { initialState, registerReducer } from "../reducers/registerReducer";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";

export default function Register() {
  const { setCustomHeader } = useHeader();
  const { signup } = useAuth();
  const { createUser, getUserDoc } = useFirestore();

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { username, email, password, error, loading } = state;

  const invalid = username === "" || email === "" || password === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    dispatch({ type: "register" });

    const usernameTaken = await getUserDoc(username);

    if (!usernameTaken) {
      try {
        const { user } = await signup(email, password);
        await createUser(user.uid, username, email);
        dispatch({ type: "success" });
        navigate(ROUTES.ADMIN);
      } catch (error) {
        const message = error.message
          .split(/(?<=\/)(.*?)(?=\))/gm)[1]
          .replace(/-/g, " ");
        dispatch({
          type: "error",
          error: message,
        });
      }
    } else {
      dispatch({ type: "error", error: "username already taken" });
    }
  };

  useEffect(() => {
    setCustomHeader(null);
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
            Create your Linkpile account for free
          </h1>
          <div className="flex w-full flex-col space-y-4">
            <div className="flex items-center space-x-1 rounded-md bg-gray-200 px-4 dark:bg-primary">
              <span className="font-nunito font-semibold text-gray-800 dark:text-white">
                Link.pile/
              </span>
              <input
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    field: "username",
                    value: e.target.value,
                  })
                }
                className="bg-gray-200 p-4 text-gray-800 outline-none dark:bg-primary dark:text-white"
                placeholder="yourname"
              ></input>
            </div>
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
              onClick={handleSignUp}
              className={`rounded-md px-4 py-2 font-nunito font-bold text-white ${
                invalid
                  ? "bg-gray-400 dark:bg-gray-800"
                  : "bg-primary-accent hover:bg-secondary-accent"
              } ${loading && "animate-pulse"}`}
            >
              Sign Up
            </button>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="mt-6 font-nunito text-lg font-semibold text-gray-600 hover:underline dark:text-gray-300"
          >
            Already on Linkpile? Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
