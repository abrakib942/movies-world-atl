import CustomButton from "../../../components/CustomButton";
import macbook from "../../../assets/img/macbook.png";
import trailerImg from "../../../assets/img/pic4.png";

const ItMovies = () => {
  return (
    <div className="lg:px-40 px-12 my-12 font-sans">
      <div className="lg:flex items-center">
        <div>
          <div className=" text-[#0399fa] text-3xl font-bold mb-3">
            ENJOY IT <span className="text-[#f5c618]">MOVIES</span>
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur optio est sapiente, ut tenetur minus blanditiis tempore
            non a ab atque adipisci nobis ipsa fugit sequi magnam at mollitia
            explicabo.
          </div>
          <CustomButton className="w-[190px] my-5 py-7 font-semibold">
            Watch Now
          </CustomButton>
        </div>

        {/* device */}
        <div className="relative ">
          <img
            src={macbook}
            alt="macbook"
            className="lg:w-[600px] w-[300px]  h-full z-50"
          />
          <img
            className="absolute inset-0 rounded-sm lg:w-[476px] w-[230px]  lg:h-[311px] h-[150px] lg:left-[62.7px] left-8 lg:top-[132px] top-16"
            src={trailerImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ItMovies;
