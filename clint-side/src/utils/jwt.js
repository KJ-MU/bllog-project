import { jwtDecode } from "jwt-decode";

function decodeJWT(token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem("token", token);
    return null;
  }
  return decodedToken;
}

export default decodeJWT;
