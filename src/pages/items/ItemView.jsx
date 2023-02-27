import { Button, Spin, Tabs, theme, message } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import ContentLayout from "../../components/layout/ContentLayout";
import { AuthContext } from "../../context/AuthContext";
import { fetchItemById } from "../../features/items/itemsSlice";
import Overview from "./Overview";
import StickyBox from "react-sticky-box";

const ItemView = (props) => {
  console.log("Props : ", props);
  const { authToken } = useContext(AuthContext);
  const item = useSelector((state) => state.items);
  const [data] = item.items;
  const dispatch = useDispatch();
  const param = useParams();
  const itemId = param.id;
  const navigate = useNavigate();
  const location = useLocation();
  //message component
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(fetchItemById({ authToken, itemId }));
    if (location.state?.editStatus === "success") success();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tabItems = [
    {
      key: "1",
      label: `Overview`,
      children: <>{item.items.length && <Overview data={data} />}</>,
      height: "100%",
    },
    {
      key: "2",
      label: `Transactions`,
      children: `WIll BE IMPLEMENTED IN FUTURE`,
      height: "100%",
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox
      offsetTop={0}
      offsetBottom={20}
      style={{
        zIndex: 1,
      }}
    >
      <DefaultTabBar
        {...props}
        style={{
          background: colorBgContainer,
        }}
      />
    </StickyBox>
  );
  //for message component
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success",
    });
  };
  return (
    <ContentLayout>
      {contextHolder}
      {item.isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          {item.items.length && (
            <>
              <ContentHeader title={data.item_name}>
                <Button onClick={() => navigate("edit")}>Edit</Button>
              </ContentHeader>
              <ContentBody paddingLeft={20}>
                <Tabs
                  renderTabBar={renderTabBar}
                  animated={false}
                  defaultActiveKey="1"
                  items={tabItems}
                  onChange={onChange}
                />
              </ContentBody>
            </>
          )}
        </>
      )}
    </ContentLayout>
  );
};

export default ItemView;
