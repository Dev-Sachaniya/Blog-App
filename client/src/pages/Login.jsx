import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../url";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 md:px-[200px]">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Bloggy</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Login To Your Account</h1>
          <input
            type="text"
            placeholder="Enter email"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
            onClick={handleLogin}
          >
            Log in
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">
              Something Went Wrong, Try Again After Sometime!
            </h3>
          )}
          <div className="flex justify-center items-center space-x-4">
            <p>
              New Here?{" "}
              <Link to="/register" className="text-[seagreen]">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
