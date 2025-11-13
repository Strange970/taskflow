import React, { useState, useContext } from "react";
import { ThemeContext } from '@/Components/ThemeProvider';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Welcome() {
  const { theme, setTheme } = useContext(ThemeContext);

  const [boards, setBoards] = useState({
    "My First Board": [
      { id: 1, title: "Design homepage" },
      { id: 2, title: "Set up database" },
      { id: 3, title: "Create login page" },
    ],
  });

  const [currentBoard, setCurrentBoard] = useState("My First Board");
  const [draggedTask, setDraggedTask] = useState(null);

  const onDropTask = (task) => {
    const updatedTasks = boards[currentBoard].filter((t) => t.id !== draggedTask.id);
    const dropIndex = boards[currentBoard].findIndex((t) => t.id === task.id);
    updatedTasks.splice(dropIndex, 0, draggedTask);
    setBoards({ ...boards, [currentBoard]: updatedTasks });
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-200">

      {/* Navbar */}
      < Navbar />

      {/* Board Selector */}
      <div className="flex items-center space-x-3 px-8 py-4 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
        {Object.keys(boards).map((boardName) => (
          <button
            key={boardName}
            onClick={() => setCurrentBoard(boardName)}
            className={`px-4 py-2 rounded transition ${
              currentBoard === boardName
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 dark:text-gray-200 border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {boardName}
          </button>
        ))}

        {/* Add Board Button */}
        <button
          onClick={() => {
            const name = prompt("Enter new board name:");
            if (name && !boards[name]) {
              setBoards({ ...boards, [name]: [] });
              setCurrentBoard(name);
            }
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          + Add Board
        </button>
      </div>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Taskflow</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
          Organize your projects effortlessly across multiple boards.  
          Try rearranging tasks below by dragging them!
        </p>
      </header>

      {/* Task List */}
      <div className="w-full max-w-md mx-auto">
        <ul className="bg-white dark:bg-gray-800 rounded shadow p-4">
          {boards[currentBoard]?.map((task) => (
            <li
              key={task.id}
              draggable
              onDragStart={() => setDraggedTask(task)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropTask(task)}
              className="p-2 mb-2 bg-gray-100 dark:bg-gray-700 rounded cursor-move hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}