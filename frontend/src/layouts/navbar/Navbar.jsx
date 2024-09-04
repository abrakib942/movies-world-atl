import { Input } from "antd";
import { SearchOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import "./navbar.css";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center font-sans gap-8 justify-center bg-[#0a0f1f] ">
      <Link to="/" className="relative no-underline">
        <div className="text-[26px] font-bold gradient-text">MOVIE</div>
        <div className="absolute left-[50px] text-white text-[16px]">World</div>
      </Link>
      <div>
        <Input
          className="w-96 mx-12 bg-white"
          addonBefore={<SearchOutlined className="" />}
          placeholder="Search Movies"
        />
      </div>
      <Link to="/" className="no-underline text-[#f5c418]">
        Get Pro
      </Link>
      <Link className="text-white no-underline" to="/movies">
        Movies
      </Link>
      <Link to="/" className="no-underline text-white">
        Watch-list
      </Link>
      <div>
        <CustomButton className="font-semibold">
          EN
          <span className="text-[8px]">
            <DownOutlined />
          </span>
        </CustomButton>
      </div>
      <div>
        <UserOutlined />
      </div>
    </div>
  );
};

export default Navbar;
