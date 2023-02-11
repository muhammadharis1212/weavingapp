import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./billTemplate.scss";

const BillTemplate = ({ bill }) => {
  const dateString = bill.billDate.toString();
  let billDate = dateString.substring(0, 10);
  console.log(billDate);

  const { authCompany } = useContext(AuthContext);
  return (
    <div className="template-container">
      <div className="template-header">
        <div className="top">
          <div className="left">
            <p> {authCompany?.name ? authCompany.name : "Company Name"}</p>
            <p>{authCompany?.city ? authCompany.city : ""}</p>
          </div>
          <div className="right">
            <h1>BILL</h1>
            <p>Bill# {bill.billNo}</p>
            <p className="balance-due">Balance Due</p>
            <p className="pkr">PKR{bill.outStandingAmount}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div>
              <p>Bill from</p>
              <Link>{bill.supplierName}</Link>
            </div>
          </div>
          <div className="right">
            <div>
              <p>Bill Date :</p>
              <p>{billDate}</p>
            </div>
            <div>
              <p>Due Date :</p>
              <p>{bill.billDueDate}</p>
            </div>
            <div>
              <p>Terms :</p>
              <p>{bill.paymentTermsLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillTemplate;
