import { GET_ALL_Items } from "../../constants/base-url";
import axios from "axios";
export async function searchItem(authToken, item_name) {
  const response = await axios.get(GET_ALL_Items + "/search", {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
    params: { item_name },
  });
  return response;
}
