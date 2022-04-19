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
        className={`flex min-h-[4rem] w-full max-w-3xl flex-col items-center justify-center p-2 ${
          linkStyle.rounded ? "rounded-3xl" : "rounded-md"
        } cursor-pointer space-y-2 transition-transform duration-300 hover:scale-105`}
      >
        <img
          src={`https://img.youtube.com/vi/${
            youtubeRegex.exec(link.link)[1]
          }/hqdefault.jpg`}
          alt="thumbnail"
          className="w-32 rounded-xl"
        />
        <p className="max-w-2xl text-center text-sm font-light">{link.title}</p>
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
        className={`flex min-h-[4rem] w-full max-w-3xl flex-col items-center justify-center p-4 ${
          linkStyle.rounded ? "rounded-3xl" : "rounded-md"
        } space-y-2 transition-transform duration-300 hover:scale-105`}
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
        <p className="max-w-2xl text-center text-sm font-light">{link.title}</p>
      </div>
    );
  return (
    <div
      style={{
        background: linkStyle.filled ? linkColor : "",
        border: linkStyle.filled ? "none" : `2px solid ${linkColor}`,
        color: linkFontColor,
      }}
      className={`flex min-h-[4rem] w-full max-w-3xl flex-col items-center justify-center p-4 ${
        linkStyle.rounded ? "rounded-3xl" : "rounded-md"
      } space-y-2 transition-transform duration-300 hover:scale-105`}
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
