const Footer = () => {
  return (
    <footer className="bg-[#0a0f1f]  text-white py-8 font-sans pt-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h2 className=" text-lg font-bold mb-4">UPCOMING MOVIES</h2>
          <div>
            <p className="mb-2">JAWAN</p>
            <p className="mb-2">The Vampire Diaries</p>
            <p className="mb-2">Barbie</p>
            <p className="mb-2">Teen all</p>
            <p className="mb-2">NCIS</p>
          </div>
        </div>

        {/* Additional Pages */}
        <div>
          <h2 className=" text-lg font-bold mb-4">ADDITIONAL PAGES</h2>
          <div>
            <p className="mb-2">Terms & Conditions</p>
            <p className="mb-2">Privacy Policy</p>
            <p className="mb-2">Cookie Policy</p>
          </div>
        </div>

        {/* Movie World Info */}
        <div>
          <div className="relative mb-8">
            <div className="text-[26px] font-bold gradient-text">MOVIE</div>
            <div className="absolute left-[50px] text-[16px]">World</div>
          </div>
          <p className="text-sm mb-4">
            © 2021 movieworld.com. All Rights Reserved. This site is not
            affiliated or owned by the listed movie streaming platform owners.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4"></div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        Copyright © 2023 movieworld ALL Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
