import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import Header from "../components/Header";
import AddTaskButton from "../components/AddTaskButton";
import SearchAndFilter from "../components/SearchAndFilter";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      const fetchedTasks = response.data;
      const categorizedTasks = {
        todo: fetchedTasks.filter((task) => task.column === "todo"),
        in_progress: fetchedTasks.filter(
          (task) => task.column === "in_progress"
        ),
        done: fetchedTasks.filter((task) => task.column === "done"),
      };
      setTasks(categorizedTasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      const createdTask = response.data;
      setTasks((prevTasks) => ({
        ...prevTasks,
        [createdTask.column]: [...prevTasks[createdTask.column], createdTask],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await updateTask(updatedTask.id, updatedTask);
      const updated = response.data;
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        // Remove from old column
        Object.keys(newTasks).forEach((column) => {
          newTasks[column] = newTasks[column].filter(
            (task) => task.id !== updated.id
          );
        });
        // Add to new column
        newTasks[updated.column].push(updated);
        return newTasks;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId, column) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [column]: prevTasks[column].filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <AddTaskButton onAdd={handleAddTask} />
        <SearchAndFilter />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TaskList
            title="TODO"
            tasks={tasks.todo}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
          <TaskList
            title="IN PROGRESS"
            tasks={tasks.in_progress}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
          <TaskList
            title="DONE"
            tasks={tasks.done}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
