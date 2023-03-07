import { BILLS } from "../../constants/base-url";
import axios from "../axios";

export async function getAllBills(
  authToken,
  filter_by,
  per_page,
  page,
  sort_column,
  sort_order
) {
  console.log("In axios", filter_by, per_page, page, sort_column, sort_order);
  const res = await axios.get(
    BILLS,
    { params: { filter_by, per_page, page, sort_column, sort_order } },
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    }
  );
  return res;
}
