import Task from "./Task";

const TaskList = ({ title, tasks, onDelete, onUpdate }) => {
  return (
    <div className="bg-white rounded shadow">
      <h2 className="bg-blue-500 text-white p-2 rounded-t">{title}</h2>
      <div className="p-2">
        {tasks.map((task, index) => (
          <Task
            key={task._id}
            task={task}
            index={index}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
