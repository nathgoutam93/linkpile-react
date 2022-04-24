import React from "react";
import PropTypes from "prop-types";

export default function LinkCard({
  link,
  linkStyle,
  linkColor,
  linkFontColor,
}) {
  return (
    <a
      href={link.link}
      target="_blank"
      rel="noreferrer"
      style={{
        background: linkStyle.filled ? linkColor : "",
        border: linkStyle.filled ? "none" : `2px solid ${linkColor}`,
        color: linkFontColor,
      }}
      className={`flex min-h-[4rem] w-full max-w-3xl items-center justify-center px-4 ${
        linkStyle.rounded ? "rounded-3xl" : "rounded-md"
      } transition-transform duration-300 hover:scale-105`}
    >
      <div className="flex flex-col space-y-1 p-2 text-center lg:space-y-0">
        <p className="text-lg font-semibold">{link.title}</p>
        <p className="max-w-2xl text-sm font-light">{link.description}</p>
      </div>
    </a>
  );
}

LinkCard.propTypes = {
  link: PropTypes.object.isRequired,
  linkStyle: PropTypes.object,
  linkColor: PropTypes.string,
  linkFontColor: PropTypes.string,
};
