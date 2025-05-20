import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts?cat=${cat}`);
        console.log("API response:", res.data);

        setPosts(Array.isArray(res.data) ? res.data.reverse() : []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex-[2] flex flex-col gap-6">
      <h1 className="text-[24px] text-gray-600 font-bold">Other posts you may like</h1>
      {posts.map((post) => (
        <div className="flex flex-col gap-2" key={post.id}>
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-[200px] object-cover"
          />
          <h2 className="text-gray-700 text-lg font-medium">{post.title}</h2>
          <Link
            to={`/post/${post.id}`}
            className="w-max px-4 py-2 border border-teal-600 text-teal-600 bg-white hover:bg-[#b9e7e7] hover:text-black transition text-sm font-semibold cursor-pointer"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};
