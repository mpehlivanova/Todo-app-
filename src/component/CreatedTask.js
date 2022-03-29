import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ButtonColor from "./Button";
import { Stack } from "@mui/material";

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
    <div id="create">
      <div onClick={() => handleClickOpen()}>
        <ButtonColor
          icon={<AddCircleIcon sx={{ mr: 1 }} />}
          text="ADD NEW TASK"
        ></ButtonColor>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <input
            style={{ padding: "10px" }}
            type="text"
            placeholder="Write task"
            onInput={getTaskName}
            value={taskName}
          ></input>
        </DialogActions>
        <Stack sx={{ m: 3 }} direction="row" spacing={2}>
          <div onClick={handleClose}>
            <ButtonColor text="BACK"></ButtonColor>{" "}
          </div>
          <div
            onClick={() => {
              handleTaskCreate();
              handleClose();
            }}
          >
            <ButtonColor text="Add"></ButtonColor>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
}
