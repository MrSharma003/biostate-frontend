import { useState } from "react";
import { Routes } from "../router/routes";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Error handling: Reset previous errors
    let hasError = false;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate name (should contain at least two words)
    if (name.trim().split(" ").length < 2) {
      newErrors.name = "Name should contain at least two words";
      hasError = true;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email address";
      hasError = true;
    }

    // Validate password
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Submit logic here
      console.log("Signing up with:", { name, email, password });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-lg p-8 bg-white/90 shadow-lg rounded-2xl backdrop-blur-md transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-wide">
          Sign Up
        </h2>

        {/* Name Input */}
        <div className="mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className={`w-full px-5 py-3 rounded-lg border-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
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
            placeholder="Password"
            className={`w-full px-5 py-3 rounded-lg border-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-8">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className={`w-full px-5 py-3 rounded-lg border-2 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 focus:ring-2 focus:ring-indigo-400"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-indigo-600">
            Already have an account?{" "}
            <a href={Routes.SIGN_IN} className="hover:underline">
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
