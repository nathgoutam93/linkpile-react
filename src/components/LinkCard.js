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
      className={`w-full max-w-4xl min-h-[4rem] px-4 flex justify-center items-center ${
        linkStyle.rounded ? "rounded-3xl" : "rounded-md"
      }`}
    >
      <div className="p-2 flex flex-col text-center space-y-1 lg:space-y-0">
        <p className="text-lg font-semibold">{link.title}</p>
        <p className="text-sm font-light max-w-2xl">{link.description}</p>
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
