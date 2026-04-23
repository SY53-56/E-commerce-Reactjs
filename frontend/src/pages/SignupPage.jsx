import { useDispatch, useSelector } from 'react-redux';

import { useState, useCallback } from 'react';

import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { signupUser } from '../features/auth/authThunk';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SignupPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
  });

  const formHandle = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const formSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!form.username || !form.email || !form.password) {
        toast.error('All fields are required');
        return;
      }

      if (form.role === 'admin' && !form.phone) {
        toast.error('Phone number required for seller');
        return;
      }

      try {
        toast.loading('Creating account...', { id: 'signup' });
        await dispatch(signupUser(form)).unwrap();
        toast.success('Account created 🎉', { id: 'signup' });
        navigate('/');
      } catch (err) {
        toast.error(err?.message || 'Signup failed ❌', { id: 'signup' });
      }
    },
    [form, dispatch, navigate]
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 bg-gray-900 text-white`}
    >
      <form
        onSubmit={formSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm opacity-60 mt-1">Join us today 🚀</p>
        </div>

        {/* Username */}
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={formHandle}
          placeholder="Enter username"
        />

        {/* Email */}
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={formHandle}
          placeholder="Enter email"
        />

        {/* Password */}
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={formHandle}
          placeholder="Enter password"
        />

        {/* Role */}
        <Select
          label="Role"
          name="role"
          value={form.role}
          onChange={formHandle}
          options={["user", "admin"]}
        />

        {/* Phone (only admin) */}
        {form.role === 'admin' && (
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={formHandle}
            placeholder="Enter phone number"
          />
        )}

        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
          name={loading ? 'Creating...' : 'Signup'}
        />

        {/* Footer */}
        <p className="text-center text-sm opacity-70">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
