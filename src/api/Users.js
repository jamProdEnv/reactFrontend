export const signup = async ({ username, password }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKENND_PROD_URL}/api/v1/user/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!res.ok) throw new Error("Failed to sign up.");
  return await res.json();
};

export const login = async ({ username, password }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKENND_PROD_URL}/api/v1/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  console.log("Info");
  if (!res.ok) throw new Error("Failed to login");

  return await res.json();
};

export const getUserInfo = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKENND_PROD_URL}/api/v1/user/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Cannot Get User Info.");
  return await res.json();
};

export const getUsers = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKENND_PROD_URL}/api/v1/users`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed To Fetch Users.");
  return await res.json();
};
