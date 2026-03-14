import React from "react";
import UserCard from "./components/UserCard";
import admin from "./assets/admin.jpg";
import user1 from "./assets/user1.jpg";
import user2 from "./assets/user2.jpg";
import Moderator from "./assets/Moderator.jpg";
import TaskItem from "./components/TaskItem ";

function App() {
  return (
    <>
      {/* Task1 */}
      <div className="min-h-screen bg-gray-50 p-8 font-sans">
        <h1 className="text-3xl text-amber-950 font-bold text-center  mb-10">
          Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <UserCard
            username="Zainab Hilal"
            role="Admin"
            email="zainab@example.com"
            phone="0123456789"
            birthdate="Jan 1st, 1995"
            profilePic={admin}
          />

          <UserCard
            username="Ahmed Ali"
            role="Moderator"
            email="ahmed@example.com"
            phone="0112233445"
            birthdate="Feb 12th, 1998"
            profilePic={Moderator}
          />

          <UserCard
            username="Sara Kamel"
            role="User"
            email="sara@example.com"
            phone="0109988776"
            birthdate="May 20th, 2000"
            profilePic={user1}
          />

          <UserCard
            username="Omar Fahmy"
            role="User"
            email="omar@example.com"
            phone="0155667788"
            birthdate="Nov 5th, 1997"
            profilePic={user2}
          />
        </div>
      </div>

      {/* Task2 */}
      <div className="min-h-screen bg-gray-50 p-8 font-sans">
        <h1 className="text-3xl text-amber-950 font-bold text-center  mb-10">
          Tasks
        </h1>
        <TaskItem taskName="React" />
        <TaskItem taskName="js" />
        <TaskItem taskName="css" />
        <TaskItem taskName="Tailwind" />
        <TaskItem taskName="Html" />
      </div>
    </>
  );
}

export default App;
