import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

export default function DeleteTask(props) {
  const handleRestoreTask = () => {
    props.onRestoreTasks(props.id);
  };
  return (
    <>
      <div className="taskList">
        <div className="check">
          <p style={{ padding: "2px" }}>
            <strong>{props.number}.&nbsp; </strong> {props.taskName}
          </p>
        </div>

        <div className="button">
          <RestoreFromTrashIcon
            onClick={() => {
              handleRestoreTask();
              props.onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}
