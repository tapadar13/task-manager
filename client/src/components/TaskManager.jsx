import { useState } from "react";
import Header from "./Header";
import AddTaskButton from "./AddTaskButton";
import SearchAndFilter from "./SearchAndFilter";
import TaskList from "./TaskColumn";

const TaskManager = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        createdAt: "01/09/2021, 05:30:00",
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        createdAt: "01/09/2021, 05:30:00",
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        createdAt: "01/09/2024, 05:30:00",
      },
    ],
    inProgress: [
      {
        id: 4,
        title: "Task 4",
        description: "Description 4",
        createdAt: "01/09/2024, 05:30:00",
      },
      {
        id: 5,
        title: "Task 5",
        description: "Description 5",
        createdAt: "01/09/2024, 05:30:00",
      },
    ],
    done: [
      {
        id: 6,
        title: "Task 6",
        description: "Description 6",
        createdAt: "01/09/2024, 05:30:00",
      },
    ],
  });

  const handleAddTask = () => {
    // Call backend API to add task
    console.log("Adding task...");
  };

  const handleDeleteTask = (id, column) => {
    // Call backend API to delete task
    console.log(`Deleting task ${id} from ${column}...`);
  };

  const handleEditTask = (id, column) => {
    // Call backend API to edit task
    console.log(`Editing task ${id} from ${column}...`);
  };

  const handleViewDetails = (id, column) => {
    // Call backend API to view task details
    console.log(`Viewing details of task ${id} from ${column}...`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AddTaskButton onAdd={handleAddTask} />
        <SearchAndFilter />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TaskList
            title="TODO"
            tasks={tasks.todo}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onViewDetails={handleViewDetails}
          />
          <TaskList
            title="IN PROGRESS"
            tasks={tasks.inProgress}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onViewDetails={handleViewDetails}
          />
          <TaskList
            title="DONE"
            tasks={tasks.done}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
