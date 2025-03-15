import React, { useState, useEffect } from "react";

const DashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [textInput, setTextInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const backendUri = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resp = await fetch(`${backendUri}/get-notes`);
        const data = await resp.json();
        setTasks(data.data);
        localStorage.setItem("tasks", JSON.stringify(data.data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = async () => {
    if (!textInput.trim()) return;
    const newTask = { notes: textInput, completed: false };

    try {
      const response = await fetch(`${backendUri}/create-notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();

      if (response.ok) {
        setTasks([...tasks, data.data]);
        setTextInput("");
        localStorage.setItem("tasks", JSON.stringify([...tasks, data.data]));
      } else {
        console.error("Error adding task:", data.message);
      }
    } catch (error) {
      console.error("Failed to send data to backend:", error);
    }
  };

  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    try {
      await fetch(`${backendUri}/update-notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !tasks.find(task => task._id === id).completed }),
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);

    try {
      await fetch(`${backendUri}/create/delete-notes/${id}`, { method: "DELETE" });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, notes: editText } : task
    );
    setTasks(updatedTasks);

    try {
      await fetch(`${backendUri}/update-notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: editText }),
      });
      setEditingTaskId(null);
      setEditText("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-lg w-full bg-gray-700 p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center text-white font-bold">NoteNest 📝</h2>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Add a task..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="border w-full p-2 bg-white rounded-md text-black"
          />
          <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add
          </button>
        </div>

        <div className="flex justify-between mt-4 text-white">
          <label className="font-medium">Filter:</label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter} className="px-2 py-1 border rounded">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <ul className="mt-4">
          {filteredTasks.map((task) => (
            <li key={task._id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center my-2 text-white">
              {editingTaskId === task._id ? (
                <>
                  <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="border p-1 rounded w-full" />
                  <button onClick={() => saveEdit(task._id)} className="ml-2 px-3 py-1 bg-green-500 rounded-md">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleComplete(task._id)} className="flex-grow cursor-pointer">
                    {task.completed ? "✅" : "⬜"} {task.notes}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => startEditing(task._id, task.notes)} className="px-3 py-1 bg-yellow-500 rounded-md">
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task._id)} className="px-3 py-1 bg-red-500 rounded-md">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
