import React, { useState } from "react";

const TaskItem = ({ taskName }) => {
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center justify-between mb-4 hover:shadow-lg transition-shadow w-full max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="w-5 h-5 accent-green-500 cursor-pointer "
          onChange={() => setIsDone(!isDone)}
        />
        <h3
          className={`text-xl font-bold ${isDone ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {taskName}
        </h3>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
