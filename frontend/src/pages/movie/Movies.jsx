import { useGetAllMoviesQuery } from "../../redux/api/movieApi";
import Loading from "../../components/Loading";

import MovieCard from "../../components/MovieCard";

const Movies = () => {
  const { data, isLoading } = useGetAllMoviesQuery({});

  const moviesData = data?.data.data;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="font-sans px-24 py-16 bg-[#061520]">
      <div className="text-center text-[#0399fa] text-3xl font-bold mb-10">
        Available <span className="text-[#f5c618]">MOVIES</span>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8 justify-items-center">
        {moviesData?.map((item, i) => (
          <div key={i}>
            <MovieCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
