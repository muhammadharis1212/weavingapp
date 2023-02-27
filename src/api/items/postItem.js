import axios from "axios";
import { POST_ITEM } from "../../constants/base-url";

export async function postItem(authToken, item) {
  try {
    const response = await axios.post(POST_ITEM, JSON.stringify({ ...item }), {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
