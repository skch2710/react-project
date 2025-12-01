import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (e) {
    console.error("Invalid token", e);
    return true;
  }
};

