import React from "react";

export default function UserListItem({ user, onClick, selected }) {
  return (
    <button
      onClick={() => onClick(user)}
      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-50 transition ${
        selected ? "ring-2 ring-amber-200 bg-amber-50" : ""
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-sm font-semibold text-gray-800">
        {user.name?.[0] || "?"}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{user.name}</div>
        <div className="text-xs text-gray-500">{user.phone}</div>
      </div>
    </button>
  );
}