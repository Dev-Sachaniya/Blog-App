//Imports
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import axios from "axios";
import { URL, IF } from "../../url";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

/*


//Code Implementation



*/
const PostDeatils = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  /* Functions */
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/api/posts/${postId}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(URL + `/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      console.log(res.data);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    navigate("/edit/" + postId);
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComments([...comments, res.data]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [postId]);
  useEffect(() => {
    fetchPost();
  }, [postId]);
  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="flex justify-center items-center mt-20">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={handleEdit}>
                  <FaEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDelete}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4 ">
            <p className="flex space-x-2 text-sm">@{post.username}</p>
            <div className="flex space-x-2 text-sm">
              <p>{post.createdAt?.slice(0, 10)}</p>
              <p>{post.createdAt?.slice(11, 16)}</p>
            </div>
          </div>
          <img
            className="w-[65%] h-[500px] mx-auto mt-8"
            src={IF + post.photo}
            alt="media"
          />
          <p className="mx-auto mt-8">{post.discription}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/*Comments*/}
            {comments.map((c) => (
              <Comment
                key={c._id}
                c={c}
                post={post}
                onDelete={(deletedCommentId) => {
                  setComments(
                    comments.filter(
                      (comment) => comment._id !== deletedCommentId
                    )
                  );
                }}
              />
            ))}
            {/*Write a comment Section*/}
            <div className="flex flex-col mt-4 md:flex-row">
              <input
                className="md:w-[90%] px-4 mt-4 md:mt-0 py-2 outline-none"
                type="text"
                placeholder="add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={addComment}
                className="bg-black text-white px-4 py-2 md:w-[10%] mt-0 md:mt-0 rounded-full"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PostDeatils;
