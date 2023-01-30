import { PARTY } from "../../constants/base-url";
import axios from "../axios";

export async function singleParty(authToken, id) {
  try {
    const response = axios.get(PARTY + `/${id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
