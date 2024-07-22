import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, onDelete, onUpdate }) => {
  console.log("Task props:", { task, index, id: task._id });
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    console.log("Deleting task with _id:", task._id);
    onDelete(task._id, task.column);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-blue-100 p-2 mb-2 rounded"
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                className="w-full p-1 mb-1 border rounded"
              />
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                className="w-full p-1 mb-1 border rounded"
              />
              <select
                name="column"
                value={editedTask.column}
                onChange={handleChange}
                className="w-full p-1 mb-1 border rounded"
              >
                <option value="todo">TODO</option>
                <option value="in_progress">IN PROGRESS</option>
                <option value="done">DONE</option>
              </select>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-black px-2 py-1 rounded text-xs mr-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm">{task.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Created at: {new Date(task.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-1"
                >
                  Delete
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
