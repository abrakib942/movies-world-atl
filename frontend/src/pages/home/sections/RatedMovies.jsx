import CardSlides from "../../../components/CardSlides";

const RatedMovies = () => {
  return (
    <div className="lg:px-40 px-12 my-12">
      <div className="text-center text-[#0399fa] text-3xl font-bold mb-3">
        MOVIES YOU <span className="text-[#f5c618]">RATED</span>
      </div>
      <div className="mt-12">
        <CardSlides />
      </div>
    </div>
  );
};

export default RatedMovies;
