import { useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./component/CreatedTask";
import Task from "./component/Task";
import Uuid from "./Uuid";

export default function App(props) {
  const [tasks, setTasks] = useState([]);
  const [editingText, setEditingText] = useState("");


  useEffect(() => {
    const allTasks = localStorage.getItem("tasks");
    const loadedTodos = JSON.parse(allTasks);
    if (loadedTodos) {
      setTasks(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const allTasks = JSON.stringify(tasks);
    localStorage.setItem("todos", allTasks);
  }, [tasks]);


  const createTask = (taskName, i) => {
    if (taskName) {
      const newTask = {
        taskName: taskName,
        id: Uuid(),
        complete: false,
      };
      setTasks([...tasks, newTask]);
    }
  };
  const deleteTask = (id) => {
    const updateTask = tasks.filter((task) => task.id !== id);
    setTasks(updateTask);
  };
  const completeTodo = (index) => {
    const allTodo = [...tasks];
    allTodo[index].complete = true;
    setTasks(allTodo);
  };
  const onEditTask = (id) => {
    const modifyTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.taskName = editingText;
      }
      return task;
    });
    setTasks(modifyTasks);
    setEditingText("");
  };
  const getValueEdit = (ev) => {
    setEditingText(ev.target.value);
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
                    isComplete={task.complete}
                    key={i}
                    taskName={task.taskName}
                    id={task.id}
                    number={i + 1}
                    index={i}
                    onDeleteTask={(id) => {
                      deleteTask(id);
                    }}
                    onCompete={(index) => completeTodo(index)}
                    onEditTask={(id) => {
                      onEditTask(id);
                    }}
                    valueEdit={editingText}
                    onInputEdit={getValueEdit}
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
