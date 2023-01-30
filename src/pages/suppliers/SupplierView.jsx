import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchParty } from "../../features/party/partySlice";
import { theme } from "antd";
import PartyProfile from "../../components/partyform/PartyProfile";
import ContentLayout from "../../components/layout/ContentLayout";
import ContentHeader from "../../components/content/ContentHeader";
import ContentBody from "../../components/content/ContentBody";
import "./supplierView.scss";

const SupplierView = () => {
  const { token } = theme.useToken();
  const { authToken } = useContext(AuthContext);
  const data = useSelector((state) => state.party);
  console.log(data.parties.firstName);
  const [selected, setSelected] = useState(1);
  let params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchParty({ authToken, id: params.id }));
    console.log("Data fetch");
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <ContentLayout>
      <ContentHeader title={"Supplier Name"} />
      <div className="supplier--menu">
        <ul>
          <li
            key={1}
            className={selected === 1 ? "li--selected" : ""}
            onClick={() => setSelected(1)}
          >
            <Link>Overview</Link>
          </li>
          <li
            key={2}
            className={selected === 2 ? "li--selected" : ""}
            onClick={() => setSelected(2)}
          >
            <Link>Transactions</Link>
          </li>
          <li
            key={3}
            className={selected === 3 ? "li--selected" : ""}
            onClick={() => setSelected(3)}
          >
            <Link>Statements</Link>
          </li>
        </ul>
      </div>
      <ContentBody>
        <PartyProfile data={data} token={token} />
      </ContentBody>
    </ContentLayout>
  );
};

export default SupplierView;
