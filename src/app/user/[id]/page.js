"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUser, FaEnvelopeOpenText, FaFingerprint } from "react-icons/fa";

export default function ProfileView() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (!id || status !== "authenticated") return;

    const getUserDetails = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error("No matching user found.");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setFailMessage(err.message);
      }
    };

    getUserDetails();
  }, [id, status]);

  if (status === "loading") {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-3 text-secondary">Verifying user session...</p>
      </section>
    );
  }

  if (failMessage) {
    return (
      <section className="container py-5 text-center">
        <div className="alert alert-warning shadow-sm">{failMessage}</div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mt-3 text-muted">Fetching user data...</p>
      </section>
    );
  }

  return (
    <main
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="bg-light shadow rounded-4 p-4"
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <div className="text-center mb-4">
          <FaUser size={75} className="text-success" />
          <h4 className="fw-bold mt-3 text-dark">Account Details</h4>
          <p className="text-secondary small">Below are the user’s credentials</p>
        </div>

        <div className="mb-3 d-flex align-items-center gap-2">
          <FaUser className="text-primary" />
          <span><b>Full Name:</b> {profile.name}</span>
        </div>

        <div className="mb-3 d-flex align-items-center gap-2">
          <FaEnvelopeOpenText className="text-danger" />
          <span><b>Email Address:</b> {profile.email}</span>
        </div>

        <hr className="my-3" />

        <div className="text-center text-muted small">
          <FaFingerprint className="me-1" />
          ID: <code>{profile._id}</code>
        </div>
      </div>
    </main>
  );
}
