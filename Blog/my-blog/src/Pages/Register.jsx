import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/auth/register`, input, {withCredentials: true,});
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth flex flex-col items-center justify-center h-screen bg-[#59f5f5]">
      <h1 className="text-teal-800 text-3xl mb-5 font-bold">Register</h1>
      <form className="flex flex-col p-12 bg-white w-[400px] h-[430px] gap-5">
        <input
          type="text"
          placeholder="Username"
          required
          className="p-3 border-b border-gray-500 focus:outline-none focus:border-teal-500"
          onChange={handleChange}
          name="username"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="p-3 border-b border-gray-500 focus:outline-none focus:border-teal-500"
          onChange={handleChange}
          name="email"
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="p-3 border-b border-gray-500 focus:outline-none focus:border-teal-500"
          onChange={handleChange}
          name="password"
        />
        <button
          className="p-3 bg-teal-800 text-white cursor-pointer hover:bg-teal-400"
          onClick={handleSubmit}
        >
          Register
        </button>
        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}
        <span className="text-sm text-center mt-4 ">
          Do you have an account?{" "}
          <Link to="/login" className="text-blue-800 underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
