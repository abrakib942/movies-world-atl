import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RightMenu = (mode) => {
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            {/* <span className="username">John Doe</span> */}
          </>
        }
      >
        {/* <Menu.Item key="project">
          <CodeOutlined /> Projects
        </Menu.Item> */}
        <Menu.Item key="profile">
          <Link>
            <UserOutlined /> Profile
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link>{/* <CodeOutlined /> Dashboard */}</Link>
        </Menu.Item>
        <Menu.Item key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
