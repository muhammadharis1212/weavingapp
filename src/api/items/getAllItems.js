import { GET_ALL_Items } from "../../constants/base-url";
import axios from "axios";

export async function getAllItems(token) {
  try {
    const response = await axios.get(GET_ALL_Items, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response?.data);
    return JSON.stringify(response?.data);
  } catch (error) {
    console.log(error?.response);
    return JSON.stringify(error.response);
  }
}
