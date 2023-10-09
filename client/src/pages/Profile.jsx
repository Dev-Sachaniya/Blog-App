import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse ">
        <div className="flex flex-col md:w-[50%] w-full mr-[50px]">
          <h1 className="text-xl font-bold mb-4">Your Posts</h1>
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
        </div>
        <div className="flex flex-col space-y-4 md:w-[50%] w-full md:items-end ml-[400px]">
          <h1 className="text-xl font-bold mb-4 mr-[63%]">Profile</h1>
          <input
            type="text"
            placeholder="your username"
            className="outline-none px-4 py-2 text-gray-500"
          />

          <input
            type="email"
            placeholder="your email"
            className="outline-none px-4 py-2 text-gray-500"
          />

          <input
            type="password"
            placeholder="your password"
            className="outline-none px-4 py-2 text-gray-500"
          />
          <div className="flex items-center space-x-4 mt-8">
            <button className="text-white font-semibold bg-black px-4 py-2 rounded-full">
              Update
            </button>
            <button className="text-white font-semibold bg-black px-4 py-2 rounded-full">
              Delete
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
