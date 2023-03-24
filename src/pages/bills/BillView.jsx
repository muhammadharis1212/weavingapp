import { EditOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ContentBody from "../../components/content/ContentBody";
import ContentHeader from "../../components/content/ContentHeader";
import ContentLayout from "../../components/layout/ContentLayout";
import { AuthContext } from "../../context/AuthContext";
import { fetchBillById } from "../../features/bills/billsSlice";
import BillTemplate from "./BillTemplate";

const BillView = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bill] = useSelector((state) => state.bills.bills);
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    dispatch(fetchBillById({ authToken, id: param.id }));
  }, []);
  console.log(param);
  console.log("Bill : ", bill);
  return (
    <ContentLayout>
      <ContentHeader title={bill?.id ? `${bill.id}` : "Bill ID"}>
        <Button type="default" onClick={() => navigate("edit")}>
          <EditOutlined />
        </Button>
      </ContentHeader>
      <Divider style={{ marginTop: 0 }} />
      <ContentBody paddingLeft={20}>
        <div>{bill ? <BillTemplate bill={bill} /> : "Unable To Load Bill"}</div>
      </ContentBody>
    </ContentLayout>
  );
};

export default BillView;
