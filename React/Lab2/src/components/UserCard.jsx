import React from "react";

const UserCard = ({ profilePic, username, email, phone, birthdate, role }) => {
  const roleColors = {
    Admin: "bg-red-500",
    Moderator: "bg-yellow-500",
    User: "bg-green-500",
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <img
        src={profilePic}
        alt={username}
        className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 mb-4"
      />

      <h3 className="text-xl font-bold text-gray-800 mb-1">{username}</h3>

      <span
        className={`${roleColors[role]} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}
      >
        {role}
      </span>

      <div className="space-y-2 text-sm text-gray-600 w-full text-center">
        <p>
          <span className="font-semibold text-gray-800">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Phone:</span> {phone}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Birthdate:</span>{" "}
          {birthdate}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
