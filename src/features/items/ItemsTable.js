import React, { useContext, useEffect } from "react";
import { getAllItems } from "../../api/items/getAllItems";
import { AuthContext } from "../../context/AuthContext";

const ItemsTable = () => {
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const getAllRequest = async () => {
      console.log("token : ", token);
      const data = await getAllItems(token);
      console.log("Items : ", data);
    };
    getAllRequest();
  }, []);
  return <div>ItemsTable</div>;
};

export default ItemsTable;
