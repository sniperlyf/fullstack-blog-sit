import { useOnScreen } from "../hooks/useOnScreen";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";

const removeHtmlTags = (text) => {
  return text.replace(/<[^>]*>/g, "");
};

export const LazyPost = ({ post, index }) => {
  const [ref, isVisible] = useOnScreen();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!isVisible) return <div ref={ref} className="h-[400px]"></div>;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      } gap-10 md:gap-20 transition-opacity duration-500 ease-in`}
    >

      <div className="relative w-full md:w-1/2">
        <div className="absolute top-4 left-[-16px] w-full h-full bg-[#b9e7e7] -z-10"></div>
        <LazyLoadImage
          src={post.img}
          alt={post.title}
          effect={imageLoaded ? "" : "blur"} 
          onLoad={handleImageLoad}
          className="w-full h-[370px] object-cover shadow-md"
        />
      </div>


      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <Link to={`/post/${post.id}`}>
          <h1 className="text-4xl font-bold mb-6 leading-snug hover:text-teal-700 transition">
            {post.title}
          </h1>
        </Link>
        <p className="text-gray-700 text-base mb-6">
          {post.desc && post.desc.length > 150
            ? `${removeHtmlTags(post.desc).slice(0, 250)}...`
            : removeHtmlTags(post.desc)}
        </p>
        <Link to={`/post/${post.id}`}>
          <button className="px-6 py-2 border border-teal-600 text-teal-600 hover:bg-[#b9e7e7] hover:text-black transition cursor-pointer">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};
