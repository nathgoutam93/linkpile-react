import PropTypes from "prop-types";

export default function Toast({ show, message }) {
  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0 "
      } fixed bottom-20 right-20 p-4 text-gray-800 bg-gray-50 rounded-xl z-50 transition-opacity pointer-events-none`}
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};
