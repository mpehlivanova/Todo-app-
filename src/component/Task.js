import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Task(props) {
  return (
    <div className="taskList">
      <div className="check">
        <p>
          <strong>{props.number}.</strong>
        </p>
        <p style={{ padding: "2px" }}>{props.taskName}</p>
      </div>

      <div className="task">
        <div className="button" onClick={()=> props.onDeleteTask(props.id)}>
          <DeleteIcon />
        </div>
        <div className="button">
          <EditIcon />
        </div>
        <div className="button">
          <CheckCircleOutlineIcon />
        </div>
      </div>
    </div>
  );
}
