import { SUPPLIERS } from "../../constants/base-url";
import axios from "../axios";

export async function getSupplier(authToken, id) {
  console.log(SUPPLIERS + `/${id}`);
  const res = await axios.get(SUPPLIERS + `/${id}`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
  });
  return res;
}
