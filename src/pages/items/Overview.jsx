import React from "react";
import ContentBody from "../../components/content/ContentBody";
import "./overview.scss";

const Overview = ({ data }) => {
  return (
    <div>
      <ContentBody>
        <table>
          <tbody>
            <tr>
              <td>Item Type</td>
              <td>{data.item_type}</td>
            </tr>
            <tr>
              <td>Inventory Tracking</td>
              <td>{`${data.trackInventory}`}</td>
            </tr>
          </tbody>
        </table>
        <p>Sales Information</p>
        <table>
          <tbody>
            <tr>
              <td>Sale Price</td>
              <td>{data.salePrice}</td>
            </tr>
            <tr>
              <td>Sale Account</td>
              <td>{data.saleAccountName}</td>
            </tr>
          </tbody>
        </table>
        <p>Purchase Information</p>
        <table>
          <tbody>
            <tr>
              <td>Sale Price</td>
              <td>{data.purchasePrice}</td>
            </tr>
            <tr>
              <td>Sale Account</td>
              <td>{data.purchaseAccountName}</td>
            </tr>
          </tbody>
        </table>
      </ContentBody>
    </div>
  );
};

export default Overview;
