import CardSlides from "../../../components/CardSlides";

const WatchList = () => {
  return (
    <div className="lg:px-40 px-12 my-28">
      <div className="  text-3xl font-bold mb-3">
        YOUR <span className="text-[#f5c618]">WATCH-LIST</span>
      </div>
      <div className="mt-12">
        <CardSlides />
      </div>
    </div>
  );
};

export default WatchList;
