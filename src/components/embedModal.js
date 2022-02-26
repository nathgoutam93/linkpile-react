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
    <div className="w-full max-w-lg p-4 bg-secondary flex flex-col font-nunito rounded-xl space-y-2">
      <button
        onClick={handleYouTube}
        className="w-full h-12 p-4 flex justify-center items-center bg-red-600 text-white rounded-xl space-x-4"
      >
        <AiFillYoutube size={25} />
        <span>YouTube Embed</span>
      </button>
      <button
        onClick={handleSpotify}
        className="w-full h-12 p-4 flex justify-center items-center bg-green-600 text-white rounded-xl space-x-4"
      >
        <BsSpotify size={25} />
        <span>Spotify Embed</span>
      </button>
    </div>
  );
}
