import { useParams } from "react-router-dom";
import { useGetSingleMovieQuery } from "../../redux/api/movieApi";
import Loading from "../../components/Loading";
import { FaStar } from "react-icons/fa";
import hero from "../../assets/img/hero.jpg";
import { Card } from "antd";
import { RightOutlined } from "@ant-design/icons";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleMovieQuery(id);

  const movie = data?.data;

  console.log("first", movie);

  if (isLoading) {
    return <Loading />;
  }

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(movie?.trailerUrl);
  const videoSrc = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="bg-[#0a0f1f] min-h-screen text-white font-sans">
      <div className="lg:px-40 px-12 py-12">
        <div className="lg:flex items-start">
          {/* Poster Image */}
          <div>
            <img
              className="w-72 h-[400px]"
              src={movie?.posterUrl}
              alt={movie?.title}
            />
            {/* Episodes, Videos, Photos */}

            <div className="my-4 flex flex-col gap-4 text-lg ">
              <div>
                EPISODES{" "}
                <span className="text-[#f5c618]">{movie?.episodes}</span>
              </div>
              <div>
                VIDEOS <span className="text-[#f5c618]">24</span>
              </div>
              <div>
                PHOTOS <span className="text-[#f5c618]">85</span>
              </div>
            </div>
          </div>

          {/* Video and Details */}
          <div className="lg:ml-12 mt-6 lg:mt-0 flex-1">
            {/* Video */}
            {videoSrc && (
              <iframe
                width="680"
                height="400"
                src={videoSrc}
                title={movie?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            {/* Details */}

            <div className="mt-4 text-gray-300 ">
              <div>{movie?.description}</div>

              <div className="mt-4">
                <strong className="text-[#0399fa]">Creators:</strong>{" "}
                {movie?.creators?.join("  ")}
              </div>

              <div className="mt-2">
                <strong className="text-[#0399fa]">Strs:</strong>{" "}
              </div>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="text-lg">{movie?.rating}</span>
                <span className="ml-2 text-sm text-gray-400">Rate Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cast Section */}
        <div className="mt-16 py-8">
          <div className="text-2xl font-bold mb-8">
            TOP <span className="text-[#0399fa]"> CAST </span>
            <button className="bg-white text-blue-500 font-bold h-8 w-8 rounded-lg border-none ">
              <RightOutlined className="text-xl" />
            </button>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {movie.cast.map((cast, i) => (
              <Card key={i} className="w-60 bg-[#13171a] border-none">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      className="w-16 h-16 rounded-full mx-auto"
                      src={hero}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-base">
                      {cast.name}
                    </div>
                    <div className="text-white">{cast.character}</div>
                    <div className="text-white text-sm">
                      {cast.episodes} episodes, {cast.year}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
