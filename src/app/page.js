"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import { FaGoogle, FaUserPlus, FaPowerOff } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  const handleDelete = async (id) => {
    await fetch("/api/users/" + id, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  if (!session)
    return (
      <section className="container mt-5 text-center">
        <h4 className="mb-3 text-danger">🔐 Restricted Area</h4>
        <p className="text-muted">You need to log in to view user data.</p>
        <button
          className="btn btn-outline-dark d-flex align-items-center gap-2 mx-auto shadow-sm"
          onClick={() => signIn("google")}
        >
          <FaGoogle /> Continue with Google
        </button>
      </section>
    );

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-dark">
          Welcome back, <span className="fw-semibold">{session.user.name}</span>
        </h3>
        <button
          className="btn btn-outline-dark d-flex align-items-center gap-2"
          onClick={() => signOut()}
        >
          <FaPowerOff /> Sign Out
        </button>
      </div>

      <div className="mb-4">
        <Link href="/add" className="btn btn-primary d-flex align-items-center gap-2">
          <FaUserPlus /> Create New User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info text-center">
          🧐 No user records available right now.
        </div>
      ) : (
        <ul className="list-group list-group-flush">
          {users.map((u) => (
            <UserItem key={u._id} user={u} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}
