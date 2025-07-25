import { useEffect, useState } from "react";

import { getTasks, addTask, removeTask } from "./api/api";

function App() {
  const [taskList, setTaskList] = useState([]);

  // Load tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTaskList(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  async function handleAddTask() {
    const taskInput = document.getElementById("taskInput");
    const newTask = taskInput.value;
    if (newTask.trim()) {
      try {
        await addTask(newTask);
        taskInput.value = "";
        // Refresh the task list
        const response = await getTasks();
        setTaskList(response.data);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  }

  async function handleRemoveTask(taskToRemove) {
    try {
      await removeTask(taskToRemove);
      // Refresh the task list
      const response = await getTasks();
      setTaskList(response.data);
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }

  return (
    <div>
      <h1>Task Tracker</h1>
      <input type="text" placeholder="Enter task" id="taskInput" />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleRemoveTask(task)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;