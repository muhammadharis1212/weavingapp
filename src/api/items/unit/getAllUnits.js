import axios from "axios";
import { GET_ALL_Items_UNIT } from "../../../constants/base-url";

export async function getAllUnits(token) {
  try {
    console.log("getAllUnits : ", token);
    const response = await axios.get(GET_ALL_Items_UNIT, {
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
