import { BASE_URL } from "../../constants/base-url";
import axios from "../axios";

export async function postParty(authToken, party) {
  try {
    const res = await axios.post(
      BASE_URL + "party/new",
      JSON.stringify(party),
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
