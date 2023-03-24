import React, { useContext } from "react";
import { Layout, theme, Card, Statistic, Row, Col } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import "./home.css";

const Home = () => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Row>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Receivable"
            value={11.28}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Payable"
            value={9.3}
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
