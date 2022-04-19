import PropTypes from "prop-types";

export default function Toast({ show, message }) {
  return (
    <div
      className={`${
        show ? "right-4 opacity-100 lg:right-20" : "-right-10 opacity-0"
      } pointer-events-none fixed bottom-3/4 z-50 flex items-center justify-center space-x-2 rounded-xl bg-green-600 p-4 font-nunito text-white transition-all lg:bottom-20`}
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};
