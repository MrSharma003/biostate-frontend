import React from "react";
import { ClipLoader } from "react-spinners";

interface SpinnerInterface {
  loading: boolean;
}

export default function Spinner({ loading }: SpinnerInterface) {
  return (
    <div
      className={`flex justify-center items-center ${
        loading ? "block" : "hidden"
      }`}
    >
      <ClipLoader size={50} color="#00BFFF" loading={loading} />
    </div>
  );
}
