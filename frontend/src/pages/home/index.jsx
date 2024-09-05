import AddedMovies from "./sections/AddedMovies";
import Banner from "./sections/Banner";
import ItMovies from "./sections/ItMovies";
import RatedMovies from "./sections/RatedMovies";
import Upcoming from "./sections/Upcoming";
import WatchList from "./sections/WatchList";

const Home = () => {
  return (
    <div className="font-sans bg-[#061520]">
      <Banner />
      <Upcoming />
      <ItMovies />
      <RatedMovies />
      <WatchList />
      <AddedMovies />
    </div>
  );
};

export default Home;
