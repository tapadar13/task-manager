import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getTasks } from "../services/api";

const AddTaskButton = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch current tasks to determine the order
      const response = await getTasks();
      const fetchedTasks = response.data;
      const maxOrder = fetchedTasks.reduce(
        (max, task) => Math.max(max, task.order),
        0
      );

      // Add the new task with the determined order
      onAdd({
        title,
        description,
        column: "todo",
        order: maxOrder + 1,
        user: user._id,
      });
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskButton;
