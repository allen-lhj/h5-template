const TOKEN_KEY = 'token';
import Cookies from 'js-cookie';
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
