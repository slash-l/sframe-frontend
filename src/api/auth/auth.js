import axios from "axios";
import settings from "@/settings";
import Cookie from "js-cookie";
import jwtDecoder from "jwt-decode";
import qs from "qs";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const getAccessTokenFromCookie = () => Cookie.get(ACCESS_TOKEN);
export const getRefreshTokenFromCookie = () => Cookie.get(REFRESH_TOKEN);

const auth = {
  username: settings.oauth.clientId,
  password: settings.oauth.clientSecret
};

export function login(username, password) {
  const params = {
    grant_type: "password",
    username,
    password
  };
  return axios.post(
    settings.preUrl.sso + "/oauth/token",
    qs.stringify(params),
    { auth }
  );
}

export function setTokensToCookie(accessToken, refreshToken) {
  Cookie.set(ACCESS_TOKEN, accessToken);
  Cookie.set(REFRESH_TOKEN, refreshToken);
}

export function removeTokensFromCookie() {
  Cookie.remove(ACCESS_TOKEN);
  Cookie.remove(REFRESH_TOKEN);
}

export const buildUserFromCookie = () => {
  const jwtToken = getAccessTokenFromCookie();
  if (!jwtToken) {
    return null;
  }
  const userInfo = jwtDecoder(jwtToken);
  console.log(userInfo);
  return {
    userId: userInfo.user_id,
    userName: userInfo.user_name,
    roles: userInfo.authorities,
    scopes: userInfo.scope,
    exp: userInfo.exp
  };
};
