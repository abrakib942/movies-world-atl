import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const decodedToken = (token) => {
  return jwtDecode(token);
};
