import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import pic1 from "../../../assets/img/pic1.jpg";
import pic2 from "../../../assets/img/pic2.jpg";
import CustomButton from "../../../components/CustomButton";

const AddedMovies = () => {
  const movies = [
    {
      title: "The Vampire Diaries",
      img: pic1,
    },
    {
      title: "Gen V",
      img: pic2,
    },
  ];

  return (
    <div className="font-sans text-center pb-8">
      <div className="text-center text-[#0399fa] text-3xl font-bold mb-3">
        MY ADDED <span className="text-[#f5c618]">MOVIES</span>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        {/* movie card */}
        {movies.map((movie, index) => (
          <div key={index} className="relative">
            <Card
              hoverable
              cover={
                <img
                  alt={movie.title}
                  src={movie.img}
                  className="w-72 h-72 object-cover rounded-lg"
                />
              }
            />
            <CustomButton className="absolute top-2 right-2 ">
              EDIT MOVIES
            </CustomButton>
          </div>
        ))}

        {/* Add Movie Card */}
        <div className="flex items-center justify-center w-52 h-52 mt-10 bg-transparent border border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-blue-500">
          <CustomButton icon={<PlusOutlined />} className="">
            ADD MOVIE
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AddedMovies;
