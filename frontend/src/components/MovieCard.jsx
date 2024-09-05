/* eslint-disable react/prop-types */

import { FaStar } from "react-icons/fa";
import {
  useAddToWatchListMutation,
  useRemoveFromWatchListMutation,
} from "../redux/api/userApi";
import CustomButton from "./CustomButton";
import {
  PlayCircleOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, message } from "antd";
import { useState } from "react";

const MovieCard = ({ item, isInWatchlist }) => {
  const [addToWatchList] = useAddToWatchListMutation();
  const [removeFromWatchList] = useRemoveFromWatchListMutation();
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);

  const handleWatchListToggle = async (movieId) => {
    try {
      if (inWatchlist) {
        // Remove from watchlist
        const res = await removeFromWatchList({
          id: movieId,
          data: {},
        }).unwrap();
        if (res?.data) {
          message.success("Removed from Watch-List");
          setInWatchlist(false);
        }
      } else {
        // Add to watchlist
        const res = await addToWatchList({ id: movieId, data: {} }).unwrap();
        if (res?.data) {
          message.success("Added to Watch-List");
          setInWatchlist(true);
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <Card
      hoverable
      className="bg-[#13171a] text-white w-[200px] border-none"
      cover={<img className="h-[230px]" alt="" src={item.posterUrl} />}
    >
      <p className="font-bold text-lg uppercase leading-none">{item.title}</p>
      <p className="leading-none flex items-center gap-1 font-semibold">
        <FaStar className="text-yellow-400" /> {item.rating}
      </p>

      <CustomButton onClick={() => handleWatchListToggle(item._id)}>
        {inWatchlist ? <CheckOutlined /> : <PlusOutlined />} Watch List
      </CustomButton>

      <p>
        <PlayCircleOutlined className="mr-1" />
        TRAILER
      </p>
    </Card>
  );
};

export default MovieCard;
