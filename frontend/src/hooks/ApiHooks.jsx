import { useDispatch } from "react-redux";

// ✅ Correct default export of a custom hook
export default function useApiHooks() {
  const dispatch = useDispatch();

  const signup = (formData) => {
    dispatch({ type: "user-Signup", payload: formData });
  };

  const login = (formData) => {
    dispatch({ type: "login", payload: formData });
  };

  return { signup, login };
}
