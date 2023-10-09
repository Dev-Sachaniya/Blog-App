/* eslint-disable react/prop-types */
import "../App.css";
import { IF } from "../../url";
const HomePosts = ({ post }) => {
  return (
    <>
      <div className="w-full flex mt-8 space-x-4 justify-center posts">
        {/* left */}
        <div className="w-[30%] h-[210px] flex justify-center items-center mt-2">
          <img
            src={IF + post.photo}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* right */}
        <div className="flex flex-col w-[55%] h-[%] mb-5 ">
          <h1 className="text-xl font-bold md:mb-2 mb-2 md:text-2xl">
            {post.title}
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center space-x-4 md:mb-4">
            <p className="flex space-x-2 text-sm">@{post.username}</p>
            <div className="flex space-x-2 text-sm">
              <p>{post.createdAt.slice(0, 10)}</p>
              <p>{post.createdAt.slice(11, 16)}</p>
            </div>
          </div>
          <p className="text-sm md:text-lg w-[800px]">
            {post.discription.slice(0, 200)}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePosts;
