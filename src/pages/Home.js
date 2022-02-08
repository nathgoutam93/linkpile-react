import React, { useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { useHeader } from '../context/headerContext';
import { useAuth } from '../context/authContext';

export default function Home() {
  const { currentUser, logOut, isLoading } = useAuth();
  const { setCustomHeader } = useHeader();

  useEffect(() => {
    const customHeader = currentUser ? (
      <div className="mr-2 flex justify-around items-center space-x-1">
        <button
          onClick={() => logOut()}
          className="px-4 py-2 text-blue-700 font-inter font-bold"
        >
          Log Out
        </button>
        <Link
          to={ROUTES.ADMIN}
          className="px-4 py-2 text-white font-inter font-bold rounded-md bg-blue-700"
        >
          Admin
        </Link>
      </div>
    ) : (
      <div className="mr-2 flex justify-around items-center space-x-1">
        <Link
          to={ROUTES.LOGIN}
          className="px-4 py-2 text-blue-700 font-inter font-bold"
        >
          Log In
        </Link>
        <Link
          to={ROUTES.REGISTER}
          className="px-4 py-2 text-white font-inter font-bold rounded-md bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    );

    setCustomHeader(customHeader);
  }, [currentUser, logOut, setCustomHeader]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-full">
      <Header />
      <section className="w-full p-4 flex flex-col justify-around lg:flex-row">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-5xl lg:text-5xl font-Rammetto font-bold">
            Linkpile
          </h1>
          <h2 className="mt-4 text-2xl lg:text-3xl font-inter font-bold">
            The only link you'll ever need
          </h2>
          <h3 className="w-5/6 my-2 mb-4 text-center text-sm lg:text-lg font-inter font-bold lg:w-auto">
            Use it to connect audiences to all of your content with just one
            link
          </h3>
          <div className="lg:h-screen flex flex-col-reverse lg:flex-col">
            <div className="flex flex-col justify-center items-center space-y-4">
              <Link
                to={ROUTES.REGISTER}
                className="py-4 px-8 text-center text-white font-inter font-bold rounded-xl bg-blue-700 uppercase"
              >
                Get Started for free
              </Link>
              <p className="mt-6 text-lg font-inter font-semibold">
                Already on Linkpile?
                <Link to={ROUTES.LOGIN} className="font-bold">
                  Log In
                </Link>
              </p>
            </div>
            <div className="mb-4 p-4 relative flex justify-center items-center">
              <div className="absolute scale-90 left-1/2 lg:left-3/4 -z-10">
                <div className="flex justify-center items-center w-[195px] h-[422px] bg-gray-900 rounded-3xl">
                  <div className="w-[95%] h-[95%] bg-gradient-to-br from-rose-400 via-violet-400 to-green-400 animate-gradient-xy rounded-3xl"></div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-center items-center w-[195px] h-[422px] bg-gray-900 rounded-3xl">
                  <div className="w-[95%] h-[95%] bg-gradient-to-br from-amber-300 via-violet-400 to-green-400 animate-gradient-xy rounded-3xl"></div>
                </div>
              </div>
              <div className="absolute scale-90 right-1/2 lg:right-3/4 -z-10">
                <div className="flex justify-center items-center w-[195px] h-[422px] bg-gray-900 rounded-3xl">
                  <div className="w-[95%] h-[95%] bg-gradient-to-br from-green-300 via-violet-400 to-amber-400 animate-gradient-xy rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full p-4 flex flex-col justify-around items-center space-y-8 lg:flex-row">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-[195px] h-[422px] bg-black rounded-3xl">
            <div className="w-[95%] h-[95%] bg-gradient-to-br from-amber-300 via-violet-400 to-green-400 animate-gradient-xy rounded-3xl"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-2xl font-mono font-bold">Link to everywhere</h1>
          <p className="max-w-lg text-xl">
            Linktree is the launchpad to your latest video, article, recipe,
            tour, store, website, social post - everywhere you are online.
          </p>
        </div>
      </section>
      <section className="w-full p-4 flex flex-col justify-around items-center space-y-8 lg:flex-row-reverse">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-[195px] h-[422px] bg-black rounded-3xl">
            <div className="w-[95%] h-[95%] bg-gradient-to-br from-amber-300 via-violet-400 to-green-400 animate-gradient-xy rounded-3xl"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-2xl font-mono font-bold">Easily managed</h1>
          <p className="max-w-lg text-xl">
            Creating a Linktree takes seconds. Use our simple drag-and-drop
            editor to effortlessly manage your content.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
