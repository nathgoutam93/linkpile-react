import PropTypes from "prop-types";

export default function Toast({ show, message }) {
  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0 "
      } fixed bottom-1/2 right-1/2 lg:bottom-20 lg:right-20 p-4 text-gray-800 font-nunito bg-gray-50 rounded-xl z-50 transition-opacity pointer-events-none`}
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};
