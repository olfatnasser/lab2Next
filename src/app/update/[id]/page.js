"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUserEdit, FaEnvelope, FaUser, FaSave } from "react-icons/fa";

export default function EditUserForm() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error("Failed to load user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, [id, status]);

  const handleSubmit = async () => {
    if (!userData.name || !userData.email) {
      return alert("❗Please complete all fields.");
    }

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to update");

      router.push("/");
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center mt-5 text-secondary">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-2">Checking your access...</p>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card bg-light p-4 shadow-lg rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <FaUserEdit size={50} className="text-success" />
          <h3 className="mt-3 text-dark fw-bold">Edit User Profile</h3>
          <p className="text-muted small">Update user information below</p>
        </div>

        <div className="form-group mb-3">
          <label className="form-label d-flex align-items-center gap-2 text-secondary">
            <FaUser /> Full Name
          </label>
          <input
            type="text"
            className="form-control shadow-sm rounded-3"
            placeholder="e.g. Sarah Ahmed"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label d-flex align-items-center gap-2 text-secondary">
            <FaEnvelope /> Email Address
          </label>
          <input
            type="email"
            className="form-control shadow-sm rounded-3"
            placeholder="e.g. sarah@example.com"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>

        <button
          className="btn btn-success w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
          onClick={handleSubmit}
        >
          <FaSave /> Save Updates
        </button>
      </div>
    </div>
  );
}
