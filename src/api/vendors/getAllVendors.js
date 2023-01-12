import axios from "axios";
import { GET_ALL_VENDORS } from "../../constants/base-url";

export async function getAllVendors(token) {
  try {
    console.log("Api : ", token);
    const response = await axios.get(GET_ALL_VENDORS, {
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
