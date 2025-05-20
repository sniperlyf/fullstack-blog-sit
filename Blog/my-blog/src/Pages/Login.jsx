import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const {login} = useContext(AuthContext)

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(input);
      if(!response) {
        throw error;
      }
      navigate("/");
    } catch (err) {
      setError("Wrong Credentials");
    }
  };

  return (
    <div className="auth flex flex-col items-center justify-center h-screen bg-[#4cf0f0]">
      <h1 className="text-teal-800 text-3xl mb-5 font-bold">Login</h1>
      <form className="flex flex-col p-12 bg-white w-[400px] h-[360px] gap-5">
        <input
          type="text"
          required
          placeholder="Username"
          className="p-3 border-b border-gray-500 focus:outline-none focus:border-teal-500"
          onChange={handleChange}
          name="username"
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="p-3 border-b border-gray-500 focus:outline-none focus:border-teal-500"
          onChange={handleChange}
          name="password"
        />
        <button className="p-3 bg-teal-800 text-white cursor-pointer hover:bg-teal-400" onClick={handleSubmit}>
          Login
        </button>
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
        <span className="text-sm text-center mt-4 ">
          Don't you have an account?{" "}
          <Link to="/register" className="text-blue-800 underline">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};
