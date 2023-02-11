import { BILLS } from "../../constants/base-url";
import axios from "../axios";

export async function getBill(authToken, id) {
  try {
    const res = await axios.get(
      BILLS + `${id}`,
      { params: { id } },
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
