export const postLogin = async (username: string, password: string) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
};

export const getWhoAmI = async () => {
  return await fetch(`${import.meta.env.VITE_SERVER}/whoami`, {
    method: "GET",
    credentials: "include",
  }).then((response) => response.json());
};

export const postSignup = async (
  username: string,
  email: string,
  password: string
) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
