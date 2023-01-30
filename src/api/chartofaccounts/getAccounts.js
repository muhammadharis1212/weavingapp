import axios from "axios";
import { GET_CHART_OF_ACCOUNTS } from "../../constants/base-url";

export async function getAccounts(token) {
  try {
    const response = await axios.get(GET_CHART_OF_ACCOUNTS, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
