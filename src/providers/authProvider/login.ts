import { jwtDecode } from "jwt-decode";
import { HttpError } from "react-admin";

export interface UserResult {
  id: string;
  email: string;
  roles: string[];
  avatar: string;
  fullName: string;
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const request = new Request("/api/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  return await addUserRequest(request);
};

export const checkAuth = async () => {
  const request = new Request("/api/auth/refresh-tokens", {
    method: "GET",
    credentials: "include",
    headers: new Headers({ "Content-Type": "application/json" }),
  });

  return await addUserRequest(request);
};

export const logout = async () => {
  const request = new Request("/api/auth/logout", {
    method: "GET",
    credentials: "include",
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  await fetch(request).then(() => localStorage.removeItem("auth"));
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("permissions");
};

const addUserRequest = async (request: RequestInfo | URL) => {
  return fetch(request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((auth) => {
      if (auth?.accessToken) {
        const user: UserResult = jwtDecode(auth.accessToken);
        if (!user.roles.includes("ADMIN")) {
          logout().then(() => {
            throw new HttpError("Forbidden", 403, {
              message: "Не достаточно прав у пользователя",
            });
          });
        }

        localStorage.setItem("token", auth?.accessToken);
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
    })
    .catch((error) => {
      throw new Error(error);
    });
};
