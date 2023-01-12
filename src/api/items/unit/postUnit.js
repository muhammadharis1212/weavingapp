import axios from "axios";
import { CREATE_ITEM_UNIT } from "../../../constants/base-url";
export async function postUnit(token, unit_name) {
  try {
    console.log("Api : ", token);
    const response = await axios.post(
      CREATE_ITEM_UNIT,
      JSON.stringify({ unit_name }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response?.data);
    return JSON.stringify(response?.data);
  } catch (error) {
    console.log(error?.response);
    return JSON.stringify(error.response);
  }
}
