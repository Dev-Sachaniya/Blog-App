const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[500px] flex md:flex-row flex-col items-start space-y-4 md:space-y-0 justify-between text-sm md:text-md py-8 md:mt-8">
        <div className="flex flex-col text-white ">
          <p>Most Viewed</p>
          <p>Careers</p>
          <p>Read Me</p>
        </div>
        <div className="flex flex-col text-white ">
          <p>Forum</p>
          <p>support</p>
          <p>Recent Posts</p>
        </div>
        <div className="flex flex-col text-white ">
          <p>Privacy</p>
          <p>Contact</p>
          <p>Terms and Conditions</p>
          <p>About Us</p>
        </div>
      </div>
      <p className="py-2 pb-2 text-center text-white bg-black">
        All Rights Reserved @Dev_Sachaniya
      </p>
    </>
  );
};

export default Footer;
