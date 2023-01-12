import Title from "antd/es/typography/Title";
import { Divider, Col, Row } from "antd";
import React from "react";

const Profile = ({ userInfo }) => {
  return (
    <div>
      <Title>Profile</Title>
      <Title level={4}>Personal Information</Title>
      <Divider />
      <Row>
        <Col span={8}>
          <Title level={5}>Name : </Title>
          <span>{userInfo.name}</span>
        </Col>
        <Col span={8}>
          <Title level={5}>Email : </Title>
          <span>{userInfo.email}</span>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Title level={5}>Address</Title>
          <span>{userInfo.address}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>State</Title>
          <span>{userInfo.state}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>City</Title>
          <span>{userInfo.city}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>Zip Code</Title>
          <span>{userInfo.zipCode}</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Title level={5}>Country</Title>
          <span>{userInfo.country}</span>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
