const ViewDetailsModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Task Details</h2>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Status:</strong> {task.column}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
