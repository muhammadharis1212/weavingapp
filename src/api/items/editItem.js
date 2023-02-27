import axios from "axios";
import { BASE_URL } from "../../constants/base-url";

export async function editItem(authToken, itemId, body) {
  const response = await axios.patch(
    BASE_URL + `items/${itemId}/edit`,
    JSON.stringify({ ...body }),
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response;
}
