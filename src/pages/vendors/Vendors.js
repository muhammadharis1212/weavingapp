import React, { useContext, useState, useEffect } from "react";
import { getAllVendors } from "../../api/vendors/getAllVendors";
import VendorListing from "../../components/VendorListing/VendorListing";
import { AuthContext } from "../../context/AuthContext";
import VendorTable from "../../features/vendors/VendorTable";

const Vendors = () => {
  const { company, token } = useContext(AuthContext);

  useEffect(() => {
    const vendors = async (token, companyId) => {
      const response = await getAllVendors(token, companyId);
    };
    vendors(token, company.id);
  }, []);
  return (
    <div>
      <VendorTable />
      <VendorListing />
    </div>
  );
};

export default Vendors;
