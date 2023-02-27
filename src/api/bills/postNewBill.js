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
    return res;
  } catch (error) {
    console.error("Axios Error : ", error.response);
    return error;
  }
}
