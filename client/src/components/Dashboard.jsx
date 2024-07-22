import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
  const [filteredTasks, setFilteredTasks] = useState({
    todo: [],
    in_progress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterAndSortTasks();
  }, [tasks, searchTerm, sortOption]);

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
      console.log(error);
    }
  };

  const filterAndSortTasks = () => {
    const filtered = Object.keys(tasks).reduce((acc, column) => {
      acc[column] = tasks[column].filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return acc;
    }, {});

    const sorted = Object.keys(filtered).reduce((acc, column) => {
      acc[column] = [...filtered[column]].sort((a, b) => {
        switch (sortOption) {
          case "recent":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "a-z":
            return a.title.localeCompare(b.title);
          case "z-a":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
      return acc;
    }, {});

    setFilteredTasks(sorted);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (option) => {
    setSortOption(option);
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
      const response = await updateTask(updatedTask._id, updatedTask);
      const updated = response.data;
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        // Remove from old column
        Object.keys(newTasks).forEach((column) => {
          newTasks[column] = newTasks[column].filter(
            (task) => task._id !== updated._id
          );
        });

        // Add to new column
        newTasks[updated.column].push(updated);

        // Ensure tasks are sorted by 'order'
        Object.keys(newTasks).forEach((column) => {
          newTasks[column] = newTasks[column].sort((a, b) => a.order - b.order);
        });

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
        [column]: prevTasks[column].filter((task) => task._id !== taskId),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    const taskToMove = tasks[sourceColumn].find(
      (task) => task._id === draggableId
    );

    if (!taskToMove) {
      console.error(
        `Task with ID ${draggableId} not found in column ${sourceColumn}`
      );
      return;
    }

    const newTasks = { ...tasks };
    newTasks[sourceColumn] = newTasks[sourceColumn].filter(
      (task) => task._id !== draggableId
    );
    newTasks[destinationColumn] = [
      ...newTasks[destinationColumn].slice(0, destination.index),
      { ...taskToMove, column: destinationColumn },
      ...newTasks[destinationColumn].slice(destination.index),
    ];

    setTasks(newTasks);

    try {
      await updateTask(draggableId, {
        ...taskToMove,
        column: destinationColumn,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      // Revert the state if the API call fails
      setTasks(tasks);
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
        <SearchAndFilter onSearch={handleSearch} onSort={handleSort} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {Object.entries(filteredTasks).map(([columnId, columnTasks]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TaskList
                      title={columnId.toUpperCase().replace("_", " ")}
                      tasks={columnTasks}
                      onDelete={handleDeleteTask}
                      onUpdate={handleUpdateTask}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Dashboard;
