import { useState, useEffect, useReducer } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/header";
import * as ROUTES from "../constants/routes";
import { useFirestore } from "../context/firestoreContext";
import { useHeader } from "../context/headerContext";
import { useAuth } from "../context/authContext";
import { initialState, profileReducer } from "../reducers/profileReducer";

export default function Profile() {
  const { setCustomHeader } = useHeader();
  const { logOut } = useAuth();
  const { userData, updateProfile, getUserDoc } = useFirestore();
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { username, email, error, loading } = state;

  const [isLoading, setLoading] = useState(true);
  const [isUpdated, setUpdated] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: "update" });

    const usernameTaken = await getUserDoc(username);

    if (!usernameTaken) {
      try {
        await updateProfile(userData.userId, {
          username: username,
          email: email,
        });
        dispatch({ type: "success" });
      } catch (error) {
        dispatch({ type: "error", error: error.message });
      } finally {
        setUpdated(true);
      }
    } else {
      dispatch({ type: "error", error: "username already taken" });
    }
  };

  useEffect(() => {
    if (userData) {
      dispatch({ type: "field", field: "username", value: userData.username });
      dispatch({ type: "field", field: "email", value: userData.email });
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    const customHeader = (
      <div className="flex items-center justify-around space-x-2">
        <button
          onClick={() => logOut()}
          className="rounded-3xl px-4 py-2 font-nunito font-bold text-primary-accent hover:bg-gray-300 dark:hover:bg-secondary"
        >
          Log Out
        </button>
        <Link
          to="/admin"
          className="rounded-3xl bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent"
        >
          Admin
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="loader" />
      </div>
    );

  if (isUpdated) return <Navigate to={`${ROUTES.ADMIN}`} />;

  return (
    <div className="h-full w-full bg-gray-200 dark:bg-primary">
      <Header />
      <div className="flex h-screen w-full flex-col items-center justify-center p-10">
        <form className="flex w-full max-w-lg flex-col space-y-4 rounded-3xl border border-gray-300 bg-white p-10 dark:border-border-dark dark:bg-secondary">
          <h2 className="mb-4 font-nunito text-xl font-semibold text-gray-800 dark:text-white">
            Account Information
          </h2>
          {error && (
            <p className="font-nunito text-base font-semibold text-rose-400">
              {error}
            </p>
          )}
          <label className="font-nunito text-sm text-gray-800 dark:text-white">
            username
          </label>
          <input
            value={username}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "username",
                value: e.target.value,
              })
            }
            type="text"
            className="w-full rounded-md bg-gray-200 p-4 text-gray-800 outline-none dark:bg-primary dark:text-white"
            placeholder="username"
          ></input>
          <label className="font-nunito text-sm text-gray-800 dark:text-white">
            email
          </label>
          <input
            disabled
            value={email}
            onChange={(e) =>
              dispatch({
                type: "field",
                field: "email",
                value: e.target.value,
              })
            }
            type="email"
            required={true}
            className="w-full rounded-md bg-gray-200 p-4 text-gray-800 outline-none dark:bg-primary dark:text-white"
            placeholder="email"
          ></input>
          <button
            disabled={loading}
            onClick={handleUpdate}
            className={`max-w-max rounded-3xl bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent ${
              loading && "animate-pulse"
            }`}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
