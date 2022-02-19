import { SocialMediaIconsReact } from "social-media-icons-react";
import PropTypes from "prop-types";
const Modal = ({ username }) => {
  return (
    <>
      <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto absolute  top-43 left-2/4 transform -translate-x-3/4 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <h3 className="text-3xl font=semibold">Share via</h3>
              <div className="grid grid-cols-2 gap-2">
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="0"
                  borderStyle="inset"
                  icon="twitter"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="RGB(29, 161, 243)"
                  iconSize="0"
                  roundness="50%"
                  url={`https://twitter.com/intent/tweet?url=https%3A%2F%2Flinkpile-bfd7.web.app%2F${username}`}
                  size="61"
                />
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="0"
                  borderStyle="inset"
                  icon="facebook"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="RGB(24, 120, 243,1)"
                  iconSize="0"
                  roundness="50%"
                  url={`https://www.facebook.com/sharer.php?u=https%3A%2F%2Flinkpile-bfd7.web.app%2F${username}`}
                  size="61"
                />
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="0"
                  borderStyle="inset"
                  icon="linkedin"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="RGB(10, 101, 194)"
                  iconSize="0"
                  roundness="50%"
                  url={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flinkpile-bfd7.web.app%2F${username}`}
                  size="61"
                />
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="0"
                  borderStyle="inset"
                  icon="reddit"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="RGB(255, 69, 0)"
                  iconSize="0"
                  roundness="50%"
                  url={`https://www.reddit.com/submit?url=https%3A%2F%2Flinkpile-bfd7.web.app%2F${username}`}
                  size="61"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  username: PropTypes.string.isRequired,
};
