import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lognInThunk } from "../store/auth/slice";
import { AppDispatch, useSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Routes } from "../router/routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.status === "fulfilled") {
      console.log("hello in setToken");
      //   featureAPI.setToken(auth.authUser.accessToken);
      navigate(Routes.SUBSTRING);
    }
  }, [navigate, auth.status]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (email.trim() === "") {
      newErrors.email = "Username is required";
      hasError = true;
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      dispatch(lognInThunk({ email, password }));
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          Login
        </h2>

        {/* Username Input */}
        <div className="mb-6">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full px-5 py-3 rounded-lg border-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={`w-full px-5 py-3 rounded-lg border-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 focus:ring-2 focus:ring-indigo-400"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-indigo-600">
            Don't have an account?{" "}
            <a
              href={Routes.SIGN_UP}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
