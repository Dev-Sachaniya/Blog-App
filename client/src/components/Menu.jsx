import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { URL } from "../../url";
import { Link } from "react-router-dom";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black w-[200px] flex flex-col items-start absolute top-5 right-6  rounded-md p-4 space-y-4   ">
      {!user && (
        <h3 className="text-white text-md hover:text-gray-500 cusrsor-pointer">
          Login
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-md hover:text-gray-500 cusrsor-pointer">
          Register
        </h3>
      )}
      {user && (
        <Link to="/write">
          <h3 className="text-white text-md hover:text-gray-500 cusrsor-pointer">
            Create Post
          </h3>
        </Link>
      )}
      {user && (
        <h3 className="text-white text-md hover:text-gray-500 cusrsor-pointer">
          My Posts
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-md hover:text-gray-500 cusrsor-pointer"
        >
          Log Out
        </h3>
      )}
    </div>
  );
};

export default Menu;
