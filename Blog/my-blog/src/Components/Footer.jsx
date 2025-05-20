import Logo from "../assets/logo.png";

export const Footer = () => {
  return (
    <footer className="mt-24 px-10 py-5  bg-[#b9e7e7] flex items-center justify-between text-xs max-w-[76vw] mx-auto ">
      <img src={Logo} alt="Logo" className="h-12" />
      <span className="text-gray-700">
        Made with <span className="text-red-500">♥️</span> and <b className="text-gray-950">React.js</b>.
      </span>
    </footer>
  );
};
