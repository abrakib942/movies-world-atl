import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { useGetAllMoviesQuery } from "../redux/api/movieApi";

import Loading from "./Loading";
import { getUserInfo } from "../utils/authService";
import { useGetSingleUserQuery } from "../redux/api/userApi";
import MovieCard from "./MovieCard";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

const CardSlides = () => {
  const { userId } = getUserInfo();

  const { data: movies, isLoading } = useGetAllMoviesQuery({});

  const { data: userData, isLoading: userLoading } =
    useGetSingleUserQuery(userId);

  const navigate = useNavigate();

  const moviesData = movies?.data?.data || [];
  const watchListMovies = userData?.data?.watchList || [];

  const isMovieInWatchlist = (movieId) => {
    return watchListMovies.some(
      (watchlistItem) => watchlistItem._id === movieId
    );
  };

  if (isLoading || userLoading) {
    return <Loading />;
  }

  return (
    <div>
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            background-color: white !important;      
            border-radius: 20% !important;                 
            padding: 5px;                       
            width: 40px;                       
            height: 40px;  
            margin: -10px -10px;                    
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px;                    
            font-weight: bold;
          }
        `}
      </style>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {(userId ? watchListMovies : moviesData).map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard
              item={item}
              isInWatchlist={isMovieInWatchlist(item._id)}
            />
          </SwiperSlide>
        ))}
        {userId && watchListMovies.length < 1 && (
          <div>
            <h4 className="text-white text-center">
              You have no item to show there
            </h4>
            <CustomButton
              onClick={() => navigate("/movies")}
              className="flex items-center justify-center mx-auto"
            >
              {" "}
              View Movies List
            </CustomButton>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default CardSlides;
