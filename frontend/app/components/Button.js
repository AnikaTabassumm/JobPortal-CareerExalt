import React from "react";

const SignupButton = ({ title, activity }) => {
  return (
    <button
      disabled={activity}
      className={`py-3 px-8 font-medium text-white shadow-md rounded-sm ${
        activity
          ? "bg-gray-400 cursor-not-allowed" // Disabled: gray background, not-allowed cursor
          : "bg-green-700 cursor-pointer" // Enabled: green background, pointer cursor
      }`}
    >
      {title}
    </button>
  );
};
const SigninButton = ({ title }) => {
  return (
    <button className="py-3 px-8 font-medium text-white shadow-md rounded-sm bg-green-700 cursor-pointer">
      {title}
    </button>
  );
};
const RoleButton = ({ image, title, role, onClick }) => {
  return (
    <button className="flex items-center gap-4 border p-3 shadow-md" onClick={onClick}>
      <div>{image}</div>
      <div className="flex-1 text-left text-gray-700">
        <h2 className="font-semibold">{role}</h2>
        <p className="text-sm">{title}</p>
      </div>
    </button>
  );
};

export { SignupButton, SigninButton, RoleButton };
