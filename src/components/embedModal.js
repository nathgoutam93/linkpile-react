import React from "react";
import { useAdmin } from "../context/adminContext";
import * as EMBED from "../constants/embed";
import { AiFillYoutube } from "react-icons/ai";
import { BsSpotify } from "react-icons/bs";

export default function EmbedModal() {
  const {
    state: { links },
    dispatch,
  } = useAdmin();

  const handleYouTube = () => {
    dispatch({
      type: "field",
      field: "links",
      value: [
        ...links,
        {
          embed: EMBED.YOUTUBE,
          title: "",
          link: "",
          description: "",
          active: true,
        },
      ],
    });
  };

  const handleSpotify = () => {
    dispatch({
      type: "field",
      field: "links",
      value: [
        ...links,
        {
          embed: EMBED.SPOTIFY,
          title: "",
          link: "",
          description: "",
          active: true,
        },
      ],
    });
  };

  return (
    <div className="flex w-5/6 max-w-lg flex-col space-y-2 rounded-xl bg-gray-200 p-4 font-nunito dark:bg-secondary">
      <button
        onClick={handleYouTube}
        className="flex h-12 w-full items-center justify-center space-x-4 rounded-xl bg-red-600 p-4 text-white"
      >
        <AiFillYoutube size={25} />
        <span>YouTube Embed</span>
      </button>
      <button
        onClick={handleSpotify}
        className="flex h-12 w-full items-center justify-center space-x-4 rounded-xl bg-green-600 p-4 text-white"
      >
        <BsSpotify size={25} />
        <span>Spotify Embed</span>
      </button>
    </div>
  );
}
