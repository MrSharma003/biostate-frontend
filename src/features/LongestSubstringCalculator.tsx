import React, { useState } from "react";
import { AppDispatch, useSelector } from "../store/store";
import { useDispatch } from "react-redux";
import { stringFeatureThunk } from "../store/substring/substringSlice";
import { Routes } from "../router/routes";
import ToggleButton from "./Button";
import CalculationHistoryModal from "./SubstringHistoryModal";
import Spinner from "./Spinner";

export default function LongestSubstringCalculator() {
  const dispatch = useDispatch<AppDispatch>();
  const { longestSubstring, uniqueSubstrings, isLoading } = useSelector(
    (state) => state.substring
  );

  console.log(isLoading);

  const [input, setInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9.,?!;:'"\s]*$/.test(value);

    if (!isValid) {
      setErrorMessage(
        "Only alphanumeric characters and basic punctuation are allowed."
      );
    } else {
      setErrorMessage(null);
    }

    setInput(value);
  };

  const calculateLongestSubstring = () => {
    if (!errorMessage) {
      dispatch(stringFeatureThunk(input));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 px-4 py-8 flex items-center justify-center">
      <div className="flex w-full max-w-7xl gap-12">
        {/* Input & Button Section */}
        <div
          className={`flex flex-col w-full md:w-1/2 transition-all ${
            longestSubstring || uniqueSubstrings.length > 0
              ? "md:w-1/3"
              : "md:w-1/2"
          }`}
        >
          <ToggleButton label="Go To Binary Tree" route={Routes.BINARY_TREE} />
          <div className="p-6 bg-white/90 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6 tracking-wide">
              🔍 Longest Substring Calculator
            </h1>
            <div className="flex flex-col gap-4 sticky top-0 bg-white p-4 rounded-lg shadow-md z-10">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className={`w-full p-4 border ${
                  errorMessage ? "border-red-500" : "border-gray-200"
                } rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                placeholder="Enter your string here"
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
              <button
                onClick={calculateLongestSubstring}
                disabled={!!errorMessage}
                className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all ${
                  errorMessage ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Calculate
              </button>

              <Spinner loading={isLoading} />

              {/* History Modal Button */}
              <div className="mt-4">
                <CalculationHistoryModal />
              </div>
            </div>
          </div>
        </div>

        {/* Results & History Section */}
        <div
          className={`flex-1 flex flex-col transition-all ${
            longestSubstring || uniqueSubstrings.length > 0
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="space-y-6 flex-1 overflow-hidden">
            {/* Longest Substring Result */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-indigo-700">
                📏 Longest Substring:
              </h2>
              <p
                className={`text-lg mt-2 ${
                  longestSubstring ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                {longestSubstring || "N/A"}
              </p>
            </div>

            {/* Unique Substrings List */}
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex flex-col max-h-[calc(100vh-400px)] overflow-y-auto">
              <h2 className="text-xl font-semibold text-purple-700">
                🧩 Unique Substrings:
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {uniqueSubstrings.length > 0 ? (
                  uniqueSubstrings.map((substring, index) => (
                    <div
                      key={index}
                      onClick={() => copyToClipboard(substring)}
                      className="px-3 py-2 bg-white text-gray-700 border border-purple-200 rounded-lg shadow-sm"
                    >
                      {substring}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2 text-center">
                    No unique substrings found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
