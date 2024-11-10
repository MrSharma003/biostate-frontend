import React, { useMemo } from "react";
import { useMatch } from "react-router-dom";
import { Routes } from "../router/routes";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function CommonAuthPage() {
  const isOnSigninPage = useMatch(Routes.SIGN_IN);
  const isOnSignupPage = useMatch(Routes.SIGN_UP);
  const Panel = useMemo(() => {
    return isOnSigninPage ? (
      <LoginPage />
    ) : isOnSignupPage ? (
      <SignupPage />
    ) : null;
  }, [isOnSigninPage, isOnSignupPage]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 h-screen flex flex-col justify-center items-center gap-4 relative">
      <div className="absolute top-6 left-6 flex items-center">
        <img
          src="/Logo.png"
          alt="logo"
          className="h-16 w-auto md:h-20 lg:h-24"
        />
      </div>

      {/* Centered Content (Login Form) */}
      <div className="flex flex-col items-center justify-center w-full max-w-md px-6 py-10">
        {Panel}
      </div>
    </div>
  );
}
