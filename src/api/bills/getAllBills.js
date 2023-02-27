import { BILLS } from "../../constants/base-url";
import axios from "../axios";

export async function getAllBills(authToken, filter_by, per_page, page) {
  try {
    const res = await axios.get(
      BILLS,
      { params: { filter_by, per_page, page } },
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
