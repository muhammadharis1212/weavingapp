import { GET_ALL_Items } from "../../constants/base-url";
import axios from "axios";

export async function getItemById(authToken, itemId) {
  console.log("itemID : ", itemId);
  const response = await axios.get(GET_ALL_Items + `/${itemId}`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
  });
  return response;
}
