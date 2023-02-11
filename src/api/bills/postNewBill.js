import { POST_NEW_BILL } from "../../constants/base-url";
import axios from "../axios";

export async function postNewBill(authToken, bill) {
  try {
    const res = await axios.post(POST_NEW_BILL, JSON.stringify(bill), {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
    console.log("Response : ", res);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
