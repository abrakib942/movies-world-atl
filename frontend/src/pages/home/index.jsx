import Banner from "./sections/Banner";
import ItMovies from "./sections/ItMovies";
import RatedMovies from "./sections/RatedMovies";
import Upcoming from "./sections/Upcoming";

const Home = () => {
  return (
    <div className="font-sans">
      <Banner />
      <Upcoming />
      <ItMovies />
      <RatedMovies />
    </div>
  );
};

export default Home;
