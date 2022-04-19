import React from "react";
import PropTypes from "prop-types";

export default function InputField({ label, value, onChange }) {
  return (
    <div className="relative w-full rounded-md bg-gray-200 p-2 pt-6 dark:bg-primary">
      <input
        type="text"
        name="name"
        required
        className="peer h-full w-full border-b-2 border-gray-300 bg-gray-200 text-base text-gray-800 outline-none dark:border-border-dark dark:bg-primary dark:text-white"
        value={value}
        onChange={(e) => onChange(e)}
      />
      <label
        html-for="name"
        className="pointer-events-none absolute top-6 left-2 text-sm text-gray-800 transition-all peer-valid:top-1 peer-valid:text-blue-500 peer-focus:top-1 peer-focus:text-blue-500 dark:text-white"
      >
        {label}
      </label>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
