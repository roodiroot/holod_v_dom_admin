import { AuthProvider, HttpError, fetchUtils } from "react-admin";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_REST_URL;

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", token);
  const resp = fetchUtils.fetchJson(url, options);
  return resp;
};

interface UserResult {
  id: string;
  email: string;
  roles: string[];
  avatar: string;
  fullName: string;
}

export const authProviders: AuthProvider = {
  login: async ({ username, password }) => {
    const { json } = await httpClient(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      credentials: "include",
    });
    if (json?.accessToken) {
      const user: UserResult = jwtDecode(json.accessToken);
      if (!user.roles.includes("ADMIN")) {
        await httpClient(`${apiUrl}/auth/logout`, {
          credentials: "include",
        });
        throw new HttpError("Forbidden", 403, {
          message: "Invalid username or password",
        });
      }
      localStorage.setItem("token", json?.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          avatar: `${import.meta.env.VITE_APP_IMG}/${user.avatar}`,
        })
      );
      localStorage.setItem(
        "permissions",
        user.roles.includes("ADMIN") ? "ADMIN" : "USER"
      );
      return;
    }
    throw new HttpError("Unauthorized", 401, {
      message: "Invalid username or password",
    });
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    await httpClient(`${apiUrl}/auth/logout`, {
      credentials: "include",
    });

    return;
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: async () => {
    const { json } = await httpClient(`${apiUrl}/auth/refresh-tokens`, {
      credentials: "include",
    });
    if (json?.accessToken) {
      const user: UserResult = jwtDecode(json.accessToken);
      if (!user.roles.includes("ADMIN")) {
        await httpClient(`${apiUrl}/auth/logout`, {
          credentials: "include",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");
        throw new HttpError("Forbidden", 403, {
          message: "Не достаточно прав для выполнения действия.",
        });
      }
      localStorage.setItem("token", json?.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          avatar: `${import.meta.env.VITE_APP_IMG}/${user.avatar}`,
        })
      );
      localStorage.setItem(
        "permissions",
        user.roles.includes("ADMIN") ? "ADMIN" : "USER"
      );
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    await httpClient(`${apiUrl}/auth/logout`, {
      credentials: "include",
    });
    throw new HttpError("Unauthorized", 401, {
      message: "Нет токена авторизации.",
    });
  },

  getPermissions: () => {
    const role = localStorage.getItem("permissions");
    return role ? Promise.resolve(role) : Promise.reject();
  },

  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;
    return Promise.resolve(user);
  },
};

export default authProviders;
