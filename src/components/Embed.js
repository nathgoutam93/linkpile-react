import PropTypes from "prop-types";
import * as EMBED from "../constants/embed";

export default function Embed({ link, linkStyle, linkColor, linkFontColor }) {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/;

  const spotifyRegex = /(?<=(com\/))(?:...)+/;

  if (link.embed === EMBED.YOUTUBE && !!youtubeRegex.exec(link.link))
    return (
      <a
        rel="noreferrer"
        href={`https://youtube.com/watch?v=${youtubeRegex.exec(link.link)[1]}`}
        target="_blank"
        style={{
          background: linkStyle.filled ? linkColor : "",
          border: linkStyle.filled ? "none" : `2px solid ${linkColor}`,
          color: linkFontColor,
        }}
        className={`w-full max-w-3xl min-h-[4rem] p-2 flex flex-col justify-center items-center ${
          linkStyle.rounded ? "rounded-3xl" : "rounded-md"
        } space-y-2 cursor-pointer hover:scale-105 transition-transform duration-300`}
      >
        <img
          src={`https://img.youtube.com/vi/${
            youtubeRegex.exec(link.link)[1]
          }/hqdefault.jpg`}
          alt="thumbnail"
          className="w-32 rounded-xl"
        />
        <p className="text-sm text-center font-light max-w-2xl">{link.title}</p>
      </a>
    );
  if (link.embed === EMBED.SPOTIFY && !!spotifyRegex.exec(link.link))
    return (
      <div
        style={{
          background: linkStyle.filled ? linkColor : "",
          border: linkStyle.filled ? "none" : `2px solid ${linkColor}`,
          color: linkFontColor,
        }}
        className={`w-full max-w-3xl min-h-[4rem] p-4 flex flex-col justify-center items-center ${
          linkStyle.rounded ? "rounded-3xl" : "rounded-md"
        } space-y-2 hover:scale-105 transition-transform duration-300`}
      >
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/${
            spotifyRegex.exec(link.link)[0]
          }`}
          width="100%"
          height="80"
          frameBorder="0"
        ></iframe>
        <p className="text-sm text-center font-light max-w-2xl">{link.title}</p>
      </div>
    );
  return (
    <div
      style={{
        background: linkStyle.filled ? linkColor : "",
        border: linkStyle.filled ? "none" : `2px solid ${linkColor}`,
        color: linkFontColor,
      }}
      className={`w-full max-w-3xl min-h-[4rem] p-4 flex flex-col justify-center items-center ${
        linkStyle.rounded ? "rounded-3xl" : "rounded-md"
      } space-y-2 hover:scale-105 transition-transform duration-300`}
    >
      Invalid Link
    </div>
  );
}

Embed.propTypes = {
  link: PropTypes.object.isRequired,
  linkStyle: PropTypes.object,
  linkColor: PropTypes.string,
  linkFontColor: PropTypes.string,
};
