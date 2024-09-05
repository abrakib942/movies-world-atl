import { useState } from "react";
import img1 from "../../../assets/img/pic1.jpg";
import img2 from "../../../assets/img/pic2.jpg";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CustomButton from "../../../components/CustomButton";

const Banner = () => {
  const images = [img1, img2];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="lg:px-40 px-12 mb-12 py-5">
      <div className="font-sans lg:flex items-center gap-12 ">
        <div className="mb-8 text-left">
          <div className="text-[60px] leading-[65px] font-bold text-[#0399fa]">
            BEST WAY OF ENTERTAINMENT
          </div>
          <div className="text-2xl text-white mt-6 font-bold ">
            MOVIES AS YOU DEMAND AT USD
          </div>
          <div className="text-2xl font-bold mt-1 text-[#f5c618]">10/MONTH</div>
        </div>
        <div className=" relative ">
          <div className="overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-[320px] rounded-lg"
            />
          </div>

          {/* left btn */}
          <div className="absolute top-[45%] -left-4">
            <button
              onClick={goToPrevious}
              className="bg-white text-blue-500 font-bold  h-12 w-12 px-3 py-2 rounded-lg border-none "
            >
              <LeftOutlined className="text-xl" />
            </button>
          </div>
          {/* Right button */}
          <div className="absolute top-[45%] left-[300px]">
            <button
              onClick={goToNext}
              className="bg-white text-blue-500 font-bold h-12 w-12 px-3 py-2 rounded-lg border-none "
            >
              <RightOutlined className="text-xl" />
            </button>
          </div>

          {/* watch btn */}
          <div className="absolute left-[68px] -bottom-3">
            <CustomButton className="w-[190px] py-7 font-semibold">
              Watch Now
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
