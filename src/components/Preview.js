import React from 'react';
import { useAdmin } from '../context/adminContext';
import Page from './page';

export default function Preview({ preview }) {
  const { state } = useAdmin();
  const { imgSrc, profileName, about, links, appearance } = state;

  return (
    <div
      className={`${
        preview ? 'w-full h-screen' : 'fixed top-0 w-[390px] h-[844px] scale-50'
      } flex justify-center items-center bg-gray-900 rounded-3xl shadow-2xl`}
    >
      <div
        className={`${
          preview ? 'w-full h-full' : 'w-[97%] h-[97%] rounded-3xl'
        } flex flex-col items-center bg-gray-700 space-y-1 overflow-y-auto s_hide`}
      >
        <Page
          imgSrc={imgSrc}
          profileName={profileName}
          about={about}
          links={links}
          appearance={appearance}
        />
      </div>
    </div>
  );
}
