import { FaStar } from "react-icons/fa";

import CustomButton from "../../components/CustomButton";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useGetAllMoviesQuery } from "../../redux/api/movieApi";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllMoviesQuery({});

  const moviesData = data?.data.data;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="font-sans px-24 my-16">
      <div className="text-center text-[#0399fa] text-3xl font-bold mb-10">
        Available <span className="text-[#f5c618]">MOVIES</span>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8 justify-items-center">
        {moviesData?.map((movie, i) => (
          <Card
            key={i}
            hoverable
            className="bg-[#13171a] text-white w-[200px]"
            cover={<img className="h-[230px]" alt="" src={movie.posterUrl} />}
            onClick={() => navigate(`/movies/${movie?._id}`)}
          >
            <p className="font-bold text-lg uppercase leading-none">
              {movie.title}
            </p>
            <p className="leading-none flex movies-center gap-1 font-semibold">
              {" "}
              <FaStar className="text-yellow-400" />{" "}
              <span className="text-white">8</span>
            </p>

            <CustomButton>+ Watch List</CustomButton>

            <p>
              <PlayCircleOutlined className="mr-1" />
              TRAILER
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Movies;
