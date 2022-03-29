import { useState } from "react";
import "./App.css";
import CreateTask from "./component/CreatedTask";
import Task from "./component/Task";
import Uuid from "./Uuid";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = (taskName, i) => {
    if (taskName) {
      const newTask = {
        taskName: taskName,
        id: Uuid(),
        fullfiled: true,
        number: i,
      };
      setTasks([...tasks, newTask]);
      console.log(tasks);
    }
  };

  return (
    <>
      <div id="App">
        <div id="triangle">
          <div id="cotainer">
            <div className="name">
              <h2>TODO APP</h2>
            </div>
            <div id="todo">
              <CreateTask
                onCreateTask={(taskName) => {
                  createTask(taskName);
                }}
              />
              <div id="listConatiner">
                {tasks.map((task, i) => (
                  <Task
                    key={i}
                    taskName={task.taskName}
                    id={task.id}
                    number={i + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
