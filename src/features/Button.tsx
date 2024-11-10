import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../router/routes";

export default function ToggleButton(props: { label: string; route: Routes }) {
  const navigate = useNavigate();
  const handleToggleFeature = () => {
    navigate(props.route);
  };
  return (
    <button
      onClick={handleToggleFeature}
      className="absolute top-4 right-4 sm:px-6 px-4 py-2 font-semibold text-gray-700 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-md hover:from-teal-500 hover:to-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 active:bg-teal-600 transition-all duration-300 ease-in-out transform active:scale-95"
    >
      {props.label}
    </button>
  );
}
