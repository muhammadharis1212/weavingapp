import React from "react";
import Title from "antd/es/typography/Title";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Divider, Col, Row } from "antd";

const EditProfile = ({ userInfo }) => {
  return (
    <div>
      <Title>Edit Profile</Title>
      <Title level={4}>Edit Personal Information</Title>
      <Divider />
      <Row>
        <Col span={4}>
          <Title level={5}>
            Name : <span style={{ color: "red" }}>*</span>
          </Title>
          <Input
            size="large"
            placeholder="Name"
            prefix={<UserOutlined />}
            value={userInfo.name}
          />
        </Col>
        <Col span={5} style={{ marginLeft: 40 }}>
          <Title level={5}>Email : </Title>
          <Input
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            disabled
            value={userInfo.email}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Title level={5}>Address</Title>
          <Input.TextArea value={userInfo.address}></Input.TextArea>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>State</Title>
          <Input
            style={{ height: 40 }}
            size="large"
            placeholder="State"
            value={userInfo.state}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>City</Title>
          <Input
            style={{ height: 40 }}
            size="large"
            placeholder="City"
            value={userInfo.city}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>Zip Code</Title>
          <Input
            style={{ height: 40 }}
            size="large"
            placeholder="Zip Code"
            value={userInfo.zipCode}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>Country</Title>
          <Input
            style={{ height: 40 }}
            size="large"
            placeholder="Country"
            value={userInfo.country}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
