import axios from "axios";
import { Get_Account_Groups } from "../../../constants/base-url";
export async function getAccountGroups(token) {
  try {
    const response = await axios.get(Get_Account_Groups, {
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
