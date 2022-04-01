import ButtonColor from "./Button";
import { Stack } from "@mui/material";

export default function InputTask(props) {
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ marginLeft: "15px" }}>
        <input
          style={{ padding: "10px" }}
          type="text"
          placeholder={props.placeholder}
          onInput={props.onInput}
        ></input>
      </div>
      <Stack sx={{ m: 2 }} direction="row" spacing={3}>
        <ButtonColor
          width = {props.width}
          text={props.buttonText}
          onClick={() => {
            props.onClickInputText();
            props.onClickBack();
          }}
        ></ButtonColor>
        <ButtonColor text="BACK" onClick={props.onClickBack}></ButtonColor>
      </Stack>
    </div>
  );
}
