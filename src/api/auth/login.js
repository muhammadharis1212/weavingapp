import axios from "axios";
import { AUTH_LOGIN } from "../../constants/base-url";

export async function login(email, password) {
  try {
    const response = await axios.post(
      AUTH_LOGIN,
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    sessionStorage.setItem("authToken", response?.data?.access_token);
    sessionStorage.setItem("authUser", JSON.stringify(response?.data?.user));
    sessionStorage.setItem(
      "authCompany",
      JSON.stringify(response?.data?.company)
    );

    return JSON.stringify(response?.data);
  } catch (error) {
    console.log(error?.response);
    return JSON.stringify(error.response);
  }
}
