import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditTaskModal from "./EditTaskModal";
import ViewDetailsModal from "./ViewDetailsModal";

const Task = ({ task, index, onDelete, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleViewDetails = () => {
    setIsViewDetailsModalOpen(true);
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
              className="bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-1"
            >
              Edit
            </button>
            <button
              onClick={handleViewDetails}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
            >
              View Details
            </button>
          </div>
          {isEditModalOpen && (
            <EditTaskModal
              task={task}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={onUpdate}
            />
          )}
          {isViewDetailsModalOpen && (
            <ViewDetailsModal
              task={task}
              onClose={() => setIsViewDetailsModalOpen(false)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
