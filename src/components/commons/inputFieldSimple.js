import React from "react";
import PropTypes from "prop-types";

export default function InputFieldSimple({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative w-full space-y-2">
      <label html-for="name" className="text-sm text-gray-800 dark:text-white">
        {label}
      </label>
      <input
        type="text"
        name="name"
        className="w-full rounded-md bg-gray-200 p-2 text-base text-gray-800 dark:bg-primary dark:text-white"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

InputFieldSimple.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
