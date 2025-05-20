import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { LazyPost } from "../Components/LazyPost";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        console.log("API response:", res.data);

        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sortedPosts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cat]);

  return (
    <div className="px-4 py-10 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col gap-36">
        {posts.map((post, index) => (
          <LazyPost key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
};
