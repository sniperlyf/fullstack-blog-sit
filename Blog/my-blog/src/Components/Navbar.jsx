import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MdLogout, MdLogin } from "react-icons/md";

export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar w-full bg-white">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-32" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="links flex items-center gap-6 text-gray-900 text-sm">
          {["art", "science", "technology", "cinema", "design", "food", "other"].map(
            (cat) => (
              <Link
                key={cat}
                to={`/?cat=${cat}`}
                className="hover:text-teal-700 transition-all duration-150 ease-in-out uppercase tracking-wide"
              >
                {cat}
              </Link>
            )
          )}

          {/* User Info */}
          {currentUser ? (
            <Link
              to={`/myblog`}
              className="cursor-pointer font-medium text-sm text-gray-700 hover:text-teal-700 transition duration-150"
            >
              {currentUser?.username?.toUpperCase()}
            </Link>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer font-medium text-sm text-gray-700 hover:text-teal-700 transition duration-150"
            >
              <MdLogin size={25} />
            </Link>
          )}

          {/* Logout Icon */}
          {currentUser ? (
            <span
              onClick={handleLogout}
              className="cursor-pointer font-medium text-sm text-gray-700 hover:text-teal-700 transition duration-150"
            >
              <MdLogout size={20} />
            </span>
          ) : null}

          {/* Write Button - Full Page Reload */}
          <span
            onClick={() => {
              window.location.href = "/write";
            }}
            className="bg-[#b9e7e7] text-teal-700 rounded-full w-12 h-12 flex items-center justify-center font-medium border border-white hover:bg-white hover:border-teal-600 hover:text-teal-600 transition-all duration-150 shadow-sm cursor-pointer"
          >
            Write
          </span>
        </div>
      </div>
    </nav>
  );
};
