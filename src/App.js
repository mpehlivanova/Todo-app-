import { useEffect, useState } from "react";
import "./App.css";
import ButtonColor from "./component/Button";
import CreateTask from "./component/CreatedTask";
import Task from "./component/Task";
import { Uuid } from "./Uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import {  Dialog } from "@mui/material";
import DeleteTask from "./component/DeleteTask";

export default function App(props) {
  const [tasks, setTasks] = useState([]);
  const [editingText, setEditingText] = useState("");
  const [select, setSelect] = useState("all");
  const [filterTasks, setFilterTasks] = useState([]);
  const [deletTasks, setDeleteTasks] = useState([]);

  //filter tasks

  const getVelueSelect = (ev) => {
    setSelect(ev.target.value);
    console.log(ev.target.value);
  };

  useEffect(() => {
    filterTask();
  }, [tasks, select]);

  const filterTask = () => {
    switch (select) {
      case "complete":
        setFilterTasks(tasks.filter((task) => task.complete === true));
        break;
      case "uncomplete":
        setFilterTasks(tasks.filter((task) => task.complete === false));
        break;
      default:
        setFilterTasks(tasks);
        break;
    }
  };


   // get saved tasks from Local Storage
   useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    if (
      localStorage.getItem("tasks") &&
      localStorage.getItem("deletTasks") === null
    ) {
      localStorage.setItem("tasks", JSON.stringify([]));
      localStorage.setItem("deletTasks", JSON.stringify([]));
    } else {
      const tasksLocal = localStorage.getItem("tasks", JSON.stringify(tasks));
      setTasks(JSON.parse(tasksLocal));
      const tasksLocalDel = localStorage.getItem(
        "deletTasks",
        JSON.stringify(deletTasks)
      );
      setDeleteTasks(JSON.parse(tasksLocalDel));
    }
  };


 //save tasks in LocalStorage
 useEffect(() => {
  saveLocalStorage();
}, [tasks]);
  

  const saveLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletTasks", JSON.stringify(deletTasks));
  };


 

  //create new task
  const createTask = (taskName) => {
    if (taskName) {
      const newTask = {
        taskName: taskName,
        id: Uuid(),
        complete: false,
        isDelete: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  // restore task

  useEffect(() => {
    restoreTask(tasks.id);
  }, []);

  const restoreTask = (id) => {
    deletTasks.forEach((task) => {
      if (task.id === id) {
        task.isDelete = !task.isDelete;
        tasks.push(task);
      }
    });

    let modified = deletTasks.filter((task) => task.id !== id);
    setDeleteTasks(modified);
  };

  //delete tasks
  const deleteTask = (id) => {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.isDelete = !task.isDelete;
        deletTasks.push(task);
      }
    });
    const updateTask = tasks.filter((task) => task.id !== id);
    setTasks(updateTask);
  };
  const deleteAll = () => {
    setDeleteTasks([]);
  };
  const restoreAll = () => {
    deletTasks.forEach((task) => tasks.push(task));
    setDeleteTasks([]);
  };

  // completely taska
  const completeTodo = (index) => {
    const allTodo = [...tasks];
    allTodo[index].complete = !allTodo[index].complete;
    setTasks(allTodo);
  };
  //editing tasks
  const onEditTask = (id) => {
    if(tasks.length !== 0){
      const modifiedTasks = [...tasks].map((task) => {
        if (task.id === id) {
          task.taskName = editingText;
        }
        return task;
      });
      setTasks(modifiedTasks);
      setEditingText("");

    }
   
  
  };
  const getValueEdit = (ev) => {
    setEditingText(ev.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div id="App">
        <div id="triangle">
          <div id="cotainer">
            <div className="name">
              <h2 className="h2">TODO APP</h2>
            </div>
            <div id="todo">
              <CreateTask
                onCreateTask={(taskName) => {
                  createTask(taskName);
                }}
                onChange={getVelueSelect}
              />
              <div id="listConatiner">
                {

                  filterTasks ? (  filterTasks.map((task, i) => (
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
                ))):("")
                }
                
              </div>
              <div id="trash">
                <ButtonColor
                  icon={<DeleteIcon />}
                  onClick={() => handleClickOpen()}
                ></ButtonColor>
                <Dialog open={open} onClose={handleClose}>
                  <div id="deleteTask">
                    <h2 style={{ margin: "20px 140px" }}>
                      These are deleted tasks
                    </h2>
                    {deletTasks.map((task, i) => (
                      <DeleteTask
                        key={i}
                        taskName={task.taskName}
                        id={task.id}
                        number={i + 1}
                        index={i}
                        onRestoreTasks={restoreTask}
                        onClose={handleClose}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "0px 0px 10px 80px",
                      gap:"20px",
                    }}
                  >
                    <div >
                      <ButtonColor
                        text="Delete all"
                        onClick={() => {
                          deleteAll();
                          handleClose();
                        }}
                      ></ButtonColor>
                    </div>
                    <div >
                      <ButtonColor
                        text="Restore all"
                        onClick={() => {
                          restoreAll();
                          handleClose();
                        }}
                      ></ButtonColor>
                    </div>
                      <ButtonColor
                        text="Back"
                        onClick={() => {
                          handleClose();
                        }}
                      ></ButtonColor>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
