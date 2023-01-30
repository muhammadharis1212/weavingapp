import axios from "axios";
import { CREATE_CHART_OF_ACCOUNTS } from "../../constants/base-url";
export async function postAccount(token, account) {
  try {
    const response = await axios.post(
      CREATE_CHART_OF_ACCOUNTS,
      JSON.stringify({ account }),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
