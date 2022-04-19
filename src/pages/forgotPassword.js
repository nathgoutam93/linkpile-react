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
    <div className="h-full w-full bg-gray-200 dark:bg-primary">
      <Header />
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 lg:p-10">
        <form
          method="Post"
          onSubmit={handleReset}
          className="flex w-full max-w-lg flex-col items-center justify-center space-y-4 rounded-3xl border border-gray-300 bg-white p-4 font-nunito dark:border-border-dark dark:bg-secondary lg:p-10"
        >
          <p className="font-nunito text-base font-semibold text-red-700">
            {error}
          </p>
          <p className="font-nunito text-base font-semibold text-red-700">
            {message}
          </p>
          <h1 className="text-gray-800 dark:text-white">Forgot Password</h1>
          <div className="flex w-full flex-col space-y-4">
            <input
              type="email"
              className="mt-2 h-5 w-full rounded-md bg-gray-200 px-3 py-5 text-gray-800 dark:bg-primary dark:text-white"
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
              className="mt-2 w-full rounded-md bg-primary-accent px-4 py-2 text-white hover:bg-secondary-accent"
            >
              Reset Password
            </button>
          </div>
          <div className="flex items-center justify-around space-x-4 p-2">
            <Link
              to={ROUTES.LOGIN}
              className="mt-6 font-nunito text-lg font-semibold text-gray-600 hover:underline dark:text-gray-300"
            >
              Log In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="mt-6 font-nunito text-lg font-semibold text-gray-600 hover:underline dark:text-gray-300"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
