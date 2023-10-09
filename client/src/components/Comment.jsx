/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { URL } from "../../url";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Comment = ({ c, onDelete }) => {
  const { user } = useContext(UserContext);
  const handleDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/comments/" + c._id, {
        withCredentials: true,
      });
      onDelete(c._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg mt-2 my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{c.createdAt?.slice(0, 10)}</p>
          <p>{c.createdAt?.slice(11, 16)}</p>

          {user._id === c.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p onClick={handleDelete} className="cursor-pointer">
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
