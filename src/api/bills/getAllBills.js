import { BILLS } from "../../constants/base-url";
import axios from "../axios";

export async function getAllBills(authToken, filter_by, limit, offset) {
  try {
    const res = await axios.get(
      BILLS,
      { params: { filter_by, limit, offset } },
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
