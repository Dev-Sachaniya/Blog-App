import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url";
import { UserContext } from "../../context/UserContext";
const EditPost = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.discription);
      setFile(res.data.photo);
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const post = {
        title,
        discription: desc,
        username: user.username,
        userId: user._id,
        categories: categories,
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("img", filename);
        data.append("file", file);
        post.photo = filename;

        try {
          const imgUpload = await axios.post(URL + "/api/upload", data);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        const res = await axios.put(URL + "/api/posts/" + postId, post, {
          withCredentials: true,
        });
        console.log(res.data);
        navigate("/posts/post/" + res.data._id);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const addCategory = () => {
    let updatedCats = [...categories];
    updatedCats.push(category);
    setCategory("");
    setCategories(updatedCats);
  };

  const deleteCategory = (index) => {
    setCategories((prevCategories) => {
      return prevCategories.filter((item, i) => i !== index);
    });
  };
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Update A Post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            className="px-4 py-2 outline-none"
            type="text"
            placeholder="Enter post's title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            className="px-4 py-2 outline-none"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8 ">
              <input
                className="px-4 py-2 outline-none"
                placeholder="Enter Categorie"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>
            {/* Categories */}
            <div className="flex px-4 mt-3">
              {categories?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                    >
                      <p>{item}</p>
                      <p
                        className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                        onClick={() => deleteCategory(index)}
                      >
                        <ImCross />
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <textarea
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none "
            placeholder="Enter post content"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
