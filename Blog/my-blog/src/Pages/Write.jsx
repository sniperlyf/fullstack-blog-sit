import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const upload = async () => {
    if (!file) {
      console.log("No file selected");
      return "";
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.url; // Cloudinary image URL
    } catch (err) {
      console.log("Error uploading image:", err);
      return "";
    }
  };


  const handleClick = async (e) => {
    e.preventDefault();

    const imgUrl = file ? await upload() : state?.img;

    const payload = {
      title,
      desc: value,
      cat,
      img: imgUrl || "",
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      if (state) {
        // Editing existing post
        await axios.put(
          `http://localhost:5000/api/posts/${state.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Creating new post
        await axios.post("http://localhost:5000/api/posts/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate("/"); 
   } catch (err) {
      console.log("Error saving post:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex mt-5 gap-10 px-10 max-w-[80vw] mx-auto">
      {/* Left Section - Title & Editor */}
      <div className="flex-1 flex flex-col gap-5">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border border-gray-300 text-xl outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="h-[350px] border border-gray-300 flex flex-col">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="flex-1 overflow-y-hidden"
          />
        </div>
      </div>

      {/* Right Section - Publish & Category */}
      <div className="w-[300px] flex flex-col gap-5">
        <div className="border border-gray-300 p-5 flex-1 flex flex-col justify-between text-sm text-gray-600">
          <h1 className="text-xl mb-2 font-bold">Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>

          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="text-teal-600 cursor-pointer underline hover:text-teal-800"
          >
            Upload Image
          </label>

          <div className="flex justify-between mt-4">
            <button className="cursor-pointer text-teal-600 bg-white border border-teal-600 py-1 px-3 hover:bg-teal-50">
              Save as Draft
            </button>
            <button
              className="cursor-pointer text-white bg-teal-600 border border-teal-600 py-1 px-3 hover:bg-teal-700"
              onClick={handleClick}
            >
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        <div className="border border-gray-300 p-5 flex-1 flex flex-col justify-between text-sm text-gray-600">
          <h1 className="text-xl mb-2 font-bold">Category</h1>
          {["art", "science", "technology", "cinema", "design", "food", "other"].map((category) => (
            <div key={category} className="flex items-center gap-2 text-teal-600 cursor-pointer">
              <input
                type="radio"
                name="cat"
                value={category}
                id={category}
                onChange={(e) => setCat(e.target.value)}
                checked={cat === category}
              />
              <label htmlFor={category} className="capitalize">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
