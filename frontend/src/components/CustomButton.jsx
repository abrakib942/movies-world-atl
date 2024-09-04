/* eslint-disable react/prop-types */
import { Button } from "antd";

const CustomButton = ({ children, onClick, className, ...rest }) => {
  return (
    <Button
      className={`bg-gradient-to-r from-blue-500 to-[#000851] text-white px-6 py-5 rounded-full border-none uppercase ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
