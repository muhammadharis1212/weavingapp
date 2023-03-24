import { GET_ALL_Items } from "../../constants/base-url";
import axios from "axios";

export async function getAllItems(
  authToken,
  filter_by,
  per_page,
  page,
  sort_column,
  sort_order
) {
  const response = await axios.get(GET_ALL_Items, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
    params: { filter_by, per_page, page, sort_column, sort_order },
  });
  return response;
}
