export async function createUser(form) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Failed to create user");
    }

    return await response.json();
  } catch (err) {
    // You can also log the error if needed
    console.error("Error creating user:", err.message);
    throw err;
  }
}
