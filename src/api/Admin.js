export async function createAdmin({ username, password, email }) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    }
  );
  if (!res.ok) throw new Error("Failed to Signup!");
  return await res.json();
}

export async function loginAdmin({ username, password }) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );

  if (!res.ok) throw new Error("Failed To Login!");
  return await res.json();
}

export const getAdminInfo = async (id) => {
  const res = await fetch(
    // `${import.meta.env.VITE_BACKEND_PROD_URL}/api/v1/user/${id}`,
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Cannot Get User Info.");
  return await res.json();
};

export const getAdmins = async () => {
  const res = await fetch(
    // `${import.meta.env.VITE_BACKEND_PROD_URL}/api/v1/users`,
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/admins`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed To Fetch Admins.");
  return await res.json();
};
