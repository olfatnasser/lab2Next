"use client";

import Link from "next/link";
import { FaUserCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

export default function UserCard({ user, onDeleteUser }) {
  return (
    <li className="bg-white list-group-item d-flex justify-content-between align-items-center rounded-4 p-3 mb-3 border shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <div className="text-primary">
          <FaUserCircle size={42} />
        </div>
        <div>
          <Link
            href={`/user/${user._id}`}
            className="fw-bold fs-5 text-dark text-decoration-none hover-underline"
          >
            {user.name}
          </Link>
          <div className="text-muted small">{user.email}</div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <Link
          href={`/update/${user._id}`}
          className="btn btn-sm btn-outline-success d-flex align-items-center gap-2 rounded-pill px-3"
          title="Edit user"
        >
          <FaEdit size={14} />
          <span>Edit</span>
        </Link>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 rounded-pill px-3"
          onClick={() => onDeleteUser(user._id)}
          title="Delete user"
        >
          <FaTrashAlt size={14} />
          <span>Delete</span>
        </button>
      </div>
    </li>
  );
}
