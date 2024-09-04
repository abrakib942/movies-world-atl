import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = (mode) => {
  const items = [
    { key: "HOME", label: "HOME", link: "/" },
    { key: "SERVICES", label: "SERVICES", link: "/services" },
    { key: "SHOP", label: "SHOP", link: "/shop" },
    { key: "BLOG", label: "BLOG", link: "/blog" },
    { key: "ABOUT US", label: "ABOUT US", link: "/about" },
    { key: "CONTACT US", label: "CONTACT US", link: "/contact" },
  ];

  return (
    <Menu style={{ fontWeight: 700 }} mode={mode}>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default LeftMenu;
