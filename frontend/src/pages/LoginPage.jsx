import React, { useState, useCallback } from "react";
import Button from "../components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk.js";
import toast from "react-hot-toast";

export default function LoginPage() {

  const { loading } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= INPUT HANDLER ================= */
  const formHandle = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  /* ================= SUBMIT ================= */
  const formSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (loading) return; // ✅ prevent spam click

    try {
      // ✅ instant feedback
      toast.loading("Logging in...", { id: "login" });

      await dispatch(loginUser(form)).unwrap();

      toast.success("Login successful ✅", { id: "login" });

      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Login failed ❌", { id: "login" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={formSubmit}
        className="w-full max-w-md rounded-2xl border shadow-lg p-6 sm:p-8 space-y-6 bg-gray-900 text-white border-gray-700"
      >

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-400">
            Please login to your account
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            value={form.email}
            onChange={formHandle}
            name="email"
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            value={form.password}
            onChange={formHandle}
            name="password"
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
          name={loading ? "Logging..." : "Login"}
        />

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>

      </form>
    </div>
  );
}