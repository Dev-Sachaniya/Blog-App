const ProfilePosts = () => {
  return (
    <>
      <div className="w-full flex mt-8 space-x-4 justify-center posts">
        {/* left */}
        <div className="w-[30%] h-[210px] flex justify-center items-center mt-2">
          <img
            src="https://static.scientificamerican.com/sciam/cache/file/7E7FD7C7-3196-4FCA-AD72E37FF06781BA_source.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* right */}
        <div className="flex flex-col w-[55%] h-[%] mb-5 ">
          <h1 className="text-xl font-bold md:mb-2 mb-2 md:text-2xl">
            Sample Text for Ai to take over the world
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center space-x-4 md:mb-4">
            <p className="flex space-x-2 text-sm">@tester</p>
            <div className="flex space-x-2 text-sm">
              <p>69-69-1969</p>
              <p>69:69 PM</p>
            </div>
          </div>
          <p className="text-sm md:text-lg w-[800px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfilePosts;
