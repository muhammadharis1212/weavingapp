import { SUPPLIERS } from "../../constants/base-url";
import axios from "../axios";

export async function searchSuppliers(token, search) {
  try {
    const res = await axios.get(SUPPLIERS, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      params: { search },
    });
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
