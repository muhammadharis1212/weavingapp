import axios from "axios";
import { GET_ALL_Items_UNIT } from "../../../constants/base-url";

export async function getAllUnits(token) {
  try {
    const response = await axios.get(GET_ALL_Items_UNIT, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
