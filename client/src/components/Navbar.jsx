import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const path = useLocation().pathname;
  const showMenu = () => {
    setMenu(!menu);
  };
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-6 py-4 md:px-[200px]">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Bloggy</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer"
          >
            <FcSearch />
          </p>
          <input
            className="border-none outline-none px-3 py-1"
            placeholder="search posts"
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        <h4>
          {user ? (
            <h3>
              <Link to="/write">Create Post</Link>
            </h3>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </h4>
        <h4>
          {user ? (
            <div onClick={showMenu} className="cursor-pointer relative">
              <p className="cursor-pointer">
                <FaBars />
                {menu && <Menu />}
              </p>
            </div>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </h4>
      </div>
      <div onClick={showMenu} className="md:hidden">
        <p className="cursor-pointer">
          <FaBars />
          {menu && <Menu />}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
