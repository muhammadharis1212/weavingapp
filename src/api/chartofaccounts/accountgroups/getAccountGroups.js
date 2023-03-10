import axios from "axios";
import { Get_aCCOUNT_GROUPS } from "../../../constants/base-url";

export async function getAccountGroups(token) {
  try {
    const response = await axios.get(Get_aCCOUNT_GROUPS, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
