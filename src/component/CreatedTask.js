import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ButtonColor from "./Button";
import InputTask from "./Input";
// import { FormControl, InputLabel, MenuItem } from "@mui/material";
// import Select from '@mui/material/Select';
import SelectTask from "./Select";

export default function CreateTask(props) {
  const [taskName, setTaskName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTaskName = (ev) => {
    setTaskName(ev.target.value);
  };

  const handleTaskCreate = () => {
    props.onCreateTask(taskName);
    setTaskName("");
  };
  return (
    <>
      <div id="create">
        <ButtonColor
          onClick={() => handleClickOpen()}
          icon={<AddCircleIcon sx={{ mr: 1 }} />}
          text="ADD NEW TASK"
        ></ButtonColor>
        <Dialog open={open} onClose={handleClose}>
          <InputTask
            onClickInputText={handleTaskCreate}
            onClickBack={() => handleClose()}
            value={taskName}
            onInput={getTaskName}
            placeholder="Write task"
            buttonText="Add"
          />
        </Dialog>
        <SelectTask onChange={props.onChange} />
      </div>
    </>
  );
}
