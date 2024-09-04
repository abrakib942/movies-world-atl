import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import pic1 from "../../../assets/img/pic1.jpg";
import pic2 from "../../../assets/img/pic2.jpg";
import pic3 from "../../../assets/img/pic3.jpg";

const Upcoming = () => {
  const items = [
    {
      img: pic1,
      title: "ROCKET LEAGUE",
    },
    {
      img: pic2,
      title: "FORTNITE",
    },
    {
      img: pic3,
      title: "GUILDWARS 2",
    },
    {
      img: pic2,
      title: "THE VAMPIRE DIARIES",
    },
    {
      img: pic3,
      title: "GEN V",
    },
  ];

  return (
    <div className="font-sans text-center my-8">
      <div>
        <div className="text-center text-[#0399fa] text-3xl font-bold mb-3">
          UPCOMING <span className="text-[#f5c618]">MOVIES</span>
        </div>
        <div className="text-center ">We constantly offer new movies</div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        // spaceBetween={10}
        slidesPerView={5}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        className="mt-8"
        onSlideChange={(swiper) => {
          // Adjust scaling based on the active index
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              slide.style.transform = "scale(1.1)";
              slide.style.border = "3px solid #0399fa";
            } else {
              slide.style.transform = "scale(0.85)";
              slide.style.border = "none";
            }
          });
        }}
        onSwiper={(swiper) => {
          // Initial scaling when the component is first rendered
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              slide.style.transform = "scale(1.1)";
              slide.style.border = "3px solid #0399fa";
            } else {
              slide.style.transform = "scale(0.85)";
              slide.style.border = "none";
            }
          });
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex-shrink-0 rounded-lg transition-transform duration-500">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="mt-[-48px] text-center text-white  z-50 py-2 rounded-b-lg backdrop-blur-md">
                {item.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Upcoming;
