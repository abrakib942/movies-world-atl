import { Input } from "antd";
import { SearchOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import "./navbar.css";
import CustomButton from "../../components/CustomButton";

const Navbar = () => {
  return (
    <div className="flex items-center  font-sans gap-8 justify-center">
      <div className="relative">
        <div className="text-[26px] font-bold gradient-text">MOVIE</div>
        <div className="absolute left-[50px] text-[16px]">World</div>
      </div>
      <div>
        <Input
          className="w-96 mx-12"
          addonBefore={<SearchOutlined />}
          placeholder="large size"
        />
      </div>
      <div className="text-[#f5c418]">Get Pro</div>
      <div>Movies</div>
      <div>Watch-list</div>
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
