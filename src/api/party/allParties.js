import { PARTY } from "../../constants/base-url";
import axios from "../axios";

export async function getAllParties(token) {
  try {
    const res = await axios.get(PARTY, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
