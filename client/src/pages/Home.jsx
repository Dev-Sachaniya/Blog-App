import axios from "axios";
import { URL } from "../../url";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noresult, setNoresult] = useState(false);
  const [loader, setLoader] = useState(true);
  const { user } = useContext(UserContext);
  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length == 0) {
        setNoresult(true);
      } else {
        setNoresult(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noresult ? (
          posts.map((post) => (
            <>
              <Link to={user ? `posts/post/${post._id}` : `/login`}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <p className="text-center mt-16 text-bold">No posts available</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
