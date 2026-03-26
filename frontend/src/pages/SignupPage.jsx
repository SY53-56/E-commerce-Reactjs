import React, { useState, useCallback } from "react";
import Button from "../components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../features/auth/authThunk.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function SignupPage() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    phone: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  /* ================= INPUT ================= */
  const formHandle = useCallback((e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value === "user" ? { phone: "" } : {})
    }));
  }, []);

  /* ================= SUBMIT ================= */
  const formSubmit = useCallback(async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.username || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.role === "admin" && !form.phone) {
      toast.error("Phone number required for seller");
      return;
    }

    if (loading) return; // prevent spam

    try {
      toast.loading("Creating account...", { id: "signup" });

      await dispatch(signupUser(form)).unwrap();

      toast.success("Account created 🎉", { id: "signup" });

      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Signup failed ❌", { id: "signup" });
    }

  }, [form, dispatch, navigate, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900 text-white">

      <form
        onSubmit={formSubmit}
        className="w-full max-w-md rounded-2xl border shadow-lg p-6 sm:p-8 space-y-6 border-gray-700"
      >

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-400">
            Sign up to get started
          </p>
        </div>

        {/* Username */}
        <input
          value={form.username}
          onChange={formHandle}
          name="username"
          required
          placeholder="Username"
          className="input"
        />

        {/* Email */}
        <input
          value={form.email}
          onChange={formHandle}
          name="email"
          type="email"
          required
          placeholder="Email"
          className="input"
        />

        {/* Password */}
        <input
          value={form.password}
          onChange={formHandle}
          name="password"
          type="password"
          required
          placeholder="Password"
          className="input"
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={formHandle}
          className="input"
        >
          <option value="user">User</option>
          <option value="admin">Seller</option>
        </select>

        {/* Phone (conditional) */}
        {form.role === "admin" && (
          <input
            value={form.phone}
            onChange={formHandle}
            name="phone"
            type="tel"
            required
            placeholder="Phone number"
            className="input"
          />
        )}

        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-green-600 rounded-lg disabled:opacity-50"
          name={loading ? "Creating..." : "Sign Up"}
        />

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}