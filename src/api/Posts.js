export const createPost = async (token, post) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/post/createPost`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    }
  );
  if (!res.ok) throw new Error("Cannot Create Post.");
  return res.json();
};

export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts?` +
      new URLSearchParams(queryParams)
  );
  if (!res.ok) throw new Error("Cannot Find Posts.");
  return res.json();
};
