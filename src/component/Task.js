import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import { Dialog } from "@mui/material";
import InputTask from "./Input";

export default function Task(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOnEditTask = () => {
    props.onEditTask(props.id);
  };
  const handleDeleteTask = (id) => {
    props.onDeleteTask(props.id);
  };

  return (
    <div className="taskList">
      <div className="check">
        <p
          style={{
            padding: "2px",
            textDecoration: props.isComplete ? "line-through" : "",
          }}
        >
          <strong>{props.number}.&nbsp; </strong> {props.taskName}
        </p>
      </div>

      <div className="task">
        <div className="button">
          <DeleteIcon onClick={handleDeleteTask} />
        </div>
        <div className="button">
          <EditIcon
            onClick={() => {
              handleClickOpen();
            }}
          />

          <Dialog open={open} onClose={handleClose}>
            <InputTask
              onClickInputText={handleOnEditTask}
              onClickBack={() => handleClose()}
              value={props.valueEdit}
              onInput={props.onInputEdit}
              placeholder="Write edit task"
              buttonText="Save edit"
             
            />
          </Dialog>
        </div>
        <div className="button">
          <CheckCircleOutlineIcon
            onClick={() => props.onCompete(props.index)}
          />
        </div>
      </div>
    </div>
  );
}
