import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { useHeader } from "../context/headerContext";
import { useAuth } from "../context/authContext";

export default function Home() {
  const { currentUser, logOut, isLoading } = useAuth();
  const { setCustomHeader } = useHeader();

  useEffect(() => {
    const customHeader = currentUser ? (
      <div className="flex items-center justify-around space-x-1 lg:mr-2">
        <button
          onClick={() => logOut()}
          className="rounded-3xl bg-white px-4 py-2 font-nunito font-bold text-primary-accent hover:bg-gray-300 dark:bg-primary dark:hover:bg-secondary"
        >
          Log Out
        </button>
        <Link
          to={ROUTES.ADMIN}
          className="rounded-3xl bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent"
        >
          Admin
        </Link>
      </div>
    ) : (
      <div className="mr-2 flex items-center justify-around space-x-1">
        <Link
          to={ROUTES.LOGIN}
          className="rounded-3xl bg-white px-4 py-2 font-nunito font-bold text-primary-accent hover:bg-gray-300 dark:bg-primary dark:hover:bg-secondary"
        >
          Log In
        </Link>
        <Link
          to={ROUTES.REGISTER}
          className="rounded-3xl bg-primary-accent px-4 py-2 font-nunito font-bold text-white hover:bg-secondary-accent"
        >
          Sign Up
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [currentUser, logOut, setCustomHeader]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="loader" />
      </div>
    );

  return (
    <div className="w-full">
      <Header />
      <section className="mb-10 flex w-full flex-col justify-around p-4 font-nunito lg:flex-row">
        <div className="flex flex-col items-center">
          <h2 className="mt-4 bg-gradient-to-r from-rose-300 via-fuchsia-400 to-blue-400 bg-clip-text text-2xl text-transparent lg:text-4xl">
            Supercharge your Link In Bio
          </h2>
          <h3 className="my-2 mb-4 w-5/6 text-center text-sm text-gray-800 dark:text-gray-100 lg:text-xl">
            The only link you&apos;ll ever need to connect audiences to all of
            your content
          </h3>
          <div className="flex flex-col-reverse items-center lg:h-screen lg:flex-col">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Link
                to={ROUTES.REGISTER}
                className="rounded-3xl bg-primary-accent py-4 px-8 text-center font-nunito text-xl font-extrabold text-gray-100 hover:bg-secondary-accent"
              >
                Get Started for free
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="mt-6 font-nunito text-lg font-semibold text-gray-700 hover:underline dark:text-gray-200"
              >
                Already on Linkpile? Log In
              </Link>
            </div>
            <img className="lg:w-2/4" src="./images/mockup1.png" alt=""></img>
          </div>
        </div>
      </section>
      <section className="my-10 flex w-full flex-col items-center justify-around space-y-8 p-4 lg:flex-row">
        <img src="./images/mockup2.png" alt="" className="lg:w-1/2"></img>
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="font-nunito text-3xl font-bold text-gray-800 dark:text-white">
            Link to everywhere
          </h1>
          <p className="max-w-md font-inter text-xl font-semibold text-gray-700 dark:text-gray-100">
            One link to all of your latest videos, articles, store, website,
            social posts.
          </p>
        </div>
      </section>
      <section className="my-10 flex w-full flex-col items-center justify-around space-y-8 p-4 lg:flex-row-reverse">
        <img src="./images/mockup3.png" alt="" className="lg:w-1/2" />
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="font-nunito text-3xl font-bold text-gray-800 dark:text-white">
            Easily managed
          </h1>
          <p className="max-w-md font-inter text-xl font-semibold text-gray-700 dark:text-gray-100">
            Simple drag-and-drop editor to effortlessly manage your content.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
