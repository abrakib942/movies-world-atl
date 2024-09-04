import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useGetAllMoviesQuery } from "../../../redux/api/movieApi";
import Loading from "../../../components/Loading";

const Upcoming = () => {
  const { data, isLoading } = useGetAllMoviesQuery({});

  const moviesData = data?.data.data;
  const upcomingMovies = moviesData?.filter(
    (movie) => movie.isUpcoming === true
  );

  console.log("first", upcomingMovies);

  if (isLoading) {
    return <Loading />;
  }

  console.log("data", data);

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
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              slide.style.transform = "scale(1.1)";
              // slide.style.border = "3px solid #0399fa";
            } else {
              slide.style.transform = "scale(0.85)";
              slide.style.border = "none";
            }
          });
        }}
        onSwiper={(swiper) => {
          const slides = swiper.slides;
          slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
              slide.style.transform = "scale(1.1)";
              // slide.style.border = "3px solid #0399fa";
            } else {
              slide.style.transform = "scale(0.85)";
              slide.style.border = "none";
            }
          });
        }}
      >
        {upcomingMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="flex-shrink-0 rounded-lg transition-transform duration-500">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-64 h-80 rounded-xl"
              />
              <div className="mt-[-42px] text-center text-white  z-50 py-2 rounded-b-lg backdrop-blur-md">
                {movie.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Upcoming;
