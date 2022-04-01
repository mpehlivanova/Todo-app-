import * as React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  fon: {
    backgroundColor: "#35474b",
    width: "120px",
    height: "36px",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "14.5px",
  },
  opt: {
    backgroundColor: "#dfe0d8",
    color: "black",
    padding: "10px",
  },
});

export default function SelectTask(props) {
  const style = useStyles();
  return (
    <div>
      <div sx={{ ml: 1 }}>
        <select
          className={style.fon}
          value={props.valueEdit}
          onChange={props.onChange}
        >
          
          <option className={style.opt} value="all">
            All
          </option>
          <option className={style.opt} value="complete">
            Complete
          </option>
          <option className={style.opt} value="uncomplete">
            Uncomplete
          </option>
        </select>
      </div>
    </div>
  );
}
