import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

export const MyBlog = () => {
  const { currentUser } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/posts?author=${currentUser.username}`
        );
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="myblog min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-teal-700">My Blog</h1>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full">
              <p>No posts to show. Write something!</p>
              <Link
                to="/write"
                className="text-teal-700 hover:underline mt-4 block"
              >
                Create a Post
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
                {/* Image with colored background */}
                <div className="relative w-full h-[370px] mb-4">
                  <div className="absolute top-4 left-[-16px] w-full h-full bg-[#b9e7e7] -z-10 rounded-md" />
                  <LazyLoadImage
                    src={post.img}
                    alt={post.title}
                    effect="blur"
                    className="w-full h-[370px] object-cover shadow-md"
                  />
                </div>

                <h2 className="text-xl font-semibold text-teal-700">
                  {post.title}
                </h2>
                <p
                  className="text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: post.desc?.substring(0, 100) + "...",
                  }}
                ></p>

                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/post/${post.id}`}>
                    <button className="px-6 py-2 border border-teal-600 text-teal-600 hover:bg-[#b9e7e7] hover:text-black transition">
                      Read More
                    </button>
                  </Link>
                  <div className="flex gap-2">
                    
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
