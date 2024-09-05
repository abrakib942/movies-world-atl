import { Row, Space, Spin } from "antd";

const Loading = () => {
  return (
    <Row
      className="bg-[#061520]"
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Space>
        <Spin tip="Loading" size="large"></Spin>
      </Space>
    </Row>
  );
};

export default Loading;
