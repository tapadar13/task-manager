import { useState } from "react";

const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Description"
        />
        <select
          name="column"
          value={editedTask.column}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="todo">TODO</option>
          <option value="in_progress">IN PROGRESS</option>
          <option value="done">DONE</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
