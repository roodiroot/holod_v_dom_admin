import { AuthProvider } from "react-admin";
import { checkAuth, login, logout } from "./login";

import.meta.env.VITE_REST_URL;

export const authProvider: AuthProvider = {
  // send username and password to the auth server and get back credentials
  login: async (params) =>
    await login({ email: params.username, password: params.password }),
  // when the dataProvider returns an error, check if this is an authentication error
  checkError: async (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      return await logout();
    }
    return Promise.resolve();
  },
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: async () => await checkAuth(),
  // remove local credentials and notify the auth server that the user logged out
  logout: async () => await logout(),
  // get the user's profile
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;
    return Promise.resolve(user);
  },
  // get the user permissions (optional)
  getPermissions: async () => {
    const role = localStorage.getItem("permissions");
    return role === "ADMIN" ? null : await logout();
  },
};

export default authProvider;
