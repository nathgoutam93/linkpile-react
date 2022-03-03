import { useReducer } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useAuth } from "../context/authContext";
import Header from "../components/header";
import {
  initialState,
  resetPasswordReducer,
} from "../reducers/resetPasswordReducer";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [state, dispatch] = useReducer(resetPasswordReducer, initialState);
  const { emailAddress, message, error, loading } = state;
  const isInvalid = emailAddress === "";

  const handleReset = (event) => {
    event.preventDefault();

    try {
      dispatch({ type: "update" });
      resetPassword(emailAddress).then(() => {
        dispatch({ type: "success" });
      });
    } catch (error) {
      dispatch({ type: "error", error: error.message });
    }
  };

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-primary">
      <Header />
      <div className="w-full h-screen p-4 lg:p-10 flex flex-col justify-center items-center">
        <form
          method="Post"
          onSubmit={handleReset}
          className="w-full max-w-lg p-4 lg:p-10 flex flex-col justify-center items-center font-nunito space-y-4 bg-white dark:bg-secondary rounded-3xl border border-gray-300 dark:border-border-dark"
        >
          <p className="text-red-700 text-base font-semibold font-nunito">
            {error}
          </p>
          <p className="text-red-700 text-base font-semibold font-nunito">
            {message}
          </p>
          <h1 className="text-gray-800 dark:text-white">Forgot Password</h1>
          <div className="w-full flex flex-col space-y-4">
            <input
              type="email"
              className="w-full h-5 mt-2 px-3 py-5 rounded-md text-gray-800 dark:text-white bg-gray-200 dark:bg-primary"
              placeholder="Email"
              onChange={({ target }) =>
                dispatch({
                  type: "field",
                  field: "emailAddress",
                  value: target.value,
                })
              }
              value={emailAddress}
            />
            <button
              disabled={isInvalid || loading}
              type="submit"
              className="w-full mt-2 px-4 py-2 text-white bg-primary-accent hover:bg-secondary-accent rounded-md"
            >
              Reset Password
            </button>
          </div>
          <div className="p-2 flex justify-around items-center space-x-4">
            <Link
              to={ROUTES.LOGIN}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-nunito font-semibold hover:underline"
            >
              Log In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-nunito font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
