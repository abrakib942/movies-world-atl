import CustomButton from "./CustomButton";
import { Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";

import pic1 from "../assets/img/pic1.jpg";

import { PlayCircleOutlined } from "@ant-design/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const CardSlides = () => {
  const items = [
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
    {
      title: "joker",
      img: pic1,
      rating: 5,
    },
  ];

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
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <Card
              key={i}
              hoverable
              className="bg-[#13171a] text-white w-[200px]"
              cover={<img className="h-[230px]" alt="" src={item.img} />}
            >
              <p className="font-bold text-lg uppercase leading-none">
                {item.title}
              </p>
              <p className="leading-none flex items-center gap-1 font-semibold">
                {" "}
                <FaStar className="text-yellow-400" /> {item.rating}
              </p>

              <CustomButton>+ Watch List</CustomButton>

              <p>
                <PlayCircleOutlined className="mr-1" />
                TRAILER
              </p>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlides;
