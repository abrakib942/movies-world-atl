import { Input, message } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./navbar.css";
import CustomButton from "../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, removeUserInfo } from "../../utils/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = isLoggedIn();

  const logOut = () => {
    removeUserInfo("accessToken");

    message.success("logged out");

    navigate("/");
  };

  return (
    <div className="flex items-center font-sans gap-8 justify-center bg-[#0a0f1f] pt-5 pb-8">
      <Link to="/" className="relative no-underline">
        <div className="text-[24px] font-bold gradient-text">MOVIE</div>
        <div className="absolute left-[50px] text-white text-[16px]">World</div>
      </Link>
      <div>
        <Input
          className="w-96 mx-12 bg-white rounded-lg"
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
      {isLogin ? (
        <>
          <Link to="/">
            <CustomButton className="font-semibold" disabled>
              EN
              <span className="text-[8px]">
                <DownOutlined />
              </span>
            </CustomButton>
          </Link>
          <Link onClick={() => logOut()} to="">
            <LogoutOutlined className="text-white" />
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <CustomButton className="font-semibold">
              EN
              <span className="text-[8px]">
                <DownOutlined />
              </span>
            </CustomButton>
          </Link>
          <Link to="/signup">
            <UserOutlined className="text-white" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
