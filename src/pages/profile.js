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
  const { userData, updateProfile } = useFirestore();
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { username, email, error, loading } = state;

  const [isLoading, setLoading] = useState(true);
  const [isUpdated, setUpdated] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    dispatch({ type: "update" });

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
      <div className="flex justify-around items-center space-x-2">
        <button
          onClick={() => logOut()}
          className="px-4 py-2 font-nunito font-bold text-primary-accent hover:bg-gray-300 dark:hover:bg-secondary rounded-3xl"
        >
          Log Out
        </button>
        <Link
          to="/admin"
          className="px-4 py-2 text-white font-nunito font-bold rounded-3xl bg-primary-accent hover:bg-secondary-accent"
        >
          Admin
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [logOut, setCustomHeader]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader" />;
      </div>
    );

  if (isUpdated) return <Navigate to={`${ROUTES.ADMIN}`} />;

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-primary">
      <Header />
      <div className="w-full h-screen p-10 flex flex-col justify-center items-center">
        <form className="w-full max-w-lg p-10 flex flex-col bg-white dark:bg-secondary space-y-4 rounded-3xl border border-gray-300 dark:border-border-dark">
          <h2 className="mb-4 text-xl text-gray-800 dark:text-white font-semibold font-nunito">
            Account Information
          </h2>
          {error && (
            <p className="text-rose-400 text-base font-semibold font-nunito">
              {error}
            </p>
          )}
          <label className="text-sm text-gray-800 dark:text-white font-nunito">
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
            className="w-full text-gray-800 dark:text-white bg-gray-200 dark:bg-primary p-4 outline-none rounded-md"
            placeholder="username"
          ></input>
          <label className="text-sm text-gray-800 dark:text-white font-nunito">
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
            className="w-full p-4 text-gray-800 dark:text-white bg-gray-200 dark:bg-primary outline-none rounded-md"
            placeholder="email"
          ></input>
          <button
            disabled={loading}
            onClick={handleUpdate}
            className={`max-w-max px-4 py-2 text-white font-nunito font-bold rounded-3xl bg-primary-accent hover:bg-secondary-accent ${
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
