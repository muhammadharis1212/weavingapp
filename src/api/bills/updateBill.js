import { BILLS } from "../../constants/base-url";
import axios from "../axios";

export async function updateBill(authToken, id, bill) {
  const res = await axios.patch(
    BILLS + `${id}/edit`,
    JSON.stringify(bill),

    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    },
    { params: { id } }
  );
  return res;
}
