import axios from "axios";
import { CREATE_ITEM_UNIT } from "../../../constants/base-url";
export async function postUnit(token, unit_name) {
  try {
    const response = await axios.post(
      CREATE_ITEM_UNIT,
      JSON.stringify({ unit_name }),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
