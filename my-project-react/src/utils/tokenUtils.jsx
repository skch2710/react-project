import { jwtDecode } from "jwt-decode";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (e) {
    console.error("Invalid token", e);
    return true;
  }
};

export const isValid = (user) => {
  if (!user) return false;
  try {
    const token = user ? JSON.parse(user)?.jwtDTO?.access_token : null;
    if (!token) return false;
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    if (decoded && decoded.aud === CLIENT_ID) {
      return true;
    }
  } catch (e) {
    console.error("Invalid token", e);
    return false;
  }
  return false;
};
