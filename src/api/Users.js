export const signup = async ({ username, password }) => {
  const res = await fetch(
    // - - - - - - - - - - If Not Using Containers For Dev Environment, Remember T O  C H A N G E  S E R V E R  U R L - - - - - - - - - - \\
    // `${import.meta.env.VITE_BACKEND_PROD_URL}/api/v1/user/signup`,
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
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
    // `${import.meta.env.VITE_BACKEND_PROD_URL}/api/v1/user/login`,
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  if (!res.ok) throw new Error("Failed to login");
  console.log("Login Successful.");
  return await res.json();
};

export const getUserInfo = async (id) => {
  const res = await fetch(
    // `${import.meta.env.VITE_BACKEND_PROD_URL}/api/v1/user/${id}`,
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${id}`,
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
    // `${import.meta.env.VITE_BACKEND_PROD_URL}/api/v1/users`,
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed To Fetch Users.");
  return await res.json();
};
