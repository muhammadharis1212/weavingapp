import { SUPPLIERS } from "../../constants/base-url";
import axios from "../axios";

export async function allSuppliers(token) {
  try {
    const res = await axios.get(SUPPLIERS, {
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
