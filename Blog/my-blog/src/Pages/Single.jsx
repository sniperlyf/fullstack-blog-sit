import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../Components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

export const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2]; 
  const { currentUser } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  // Fetch post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchData();
  }, [postId]);

  const formattedDate = moment(post.date).isValid()
    ? moment(post.date).fromNow()
    : "Date not available";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }},)
      navigate("/"); 
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete the post. Please try again.");
    }
  };

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="flex gap-12 px-6 py-10 max-w-7xl mx-auto">
      <div className="flex-[5] flex flex-col gap-8">

        {post.img && (
          <img
            src={post.img}
            alt="Post"
            className="w-full h-[300px] object-cover"
          />
        )}

        <div className="flex items-center gap-4 text-sm">
          {!post.userImg && (
            <img
              src={post.img}
              alt="User"
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold">
              {post.username || "Unknown User"}
            </span>
            <p className="text-gray-500">Posted {formattedDate}</p>
          </div>

          {currentUser?.username === post.username && (
            <div className="flex items-center gap-2 ml-auto">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="Edit" className="w-5 h-5 cursor-pointer" />
              </Link>
              <img
                onClick={handleDelete} 
                src={Delete}
                alt="Delete"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-justify leading-8 text-gray-700">
          {post.desc && getText(post.desc)}
        </p>
      </div>

      <Menu cat={post.cat} />
    </div>
  );
};
