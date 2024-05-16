import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const signUpUserApi = (userData) => API.post("/users", userData);
export const signInUserApi = (email, password) => API.get("/users", { params: { email, password } });
export const getAllUser = () => API.get("/users");

export const getGoogleAccessToken = (code, clientId) =>
  axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: clientId,
    client_secret: "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",
    redirect_uri: "http://localhost:5173",
    grant_type: "authorization_code",
  });
export const getUserDetailsByToken = (accessToken) =>
  axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
