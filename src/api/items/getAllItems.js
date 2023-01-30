import { GET_ALL_Items } from "../../constants/base-url";
import axios from "axios";

export async function getAllItems(authToken) {
  try {
    const response = await axios.get(GET_ALL_Items, {
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
