import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#35474b",
      contrastText: "#fff",
    },
  },
});

export default function ButtonColor(props) {
  return (
    <div style={{ width: `${props.width}` }}>
      <ThemeProvider theme={theme}>
        <Button color="neutral" variant="contained" onClick={props.onClick}>
          {props.icon}
          {props.text}
        </Button>
      </ThemeProvider>
    </div>
  );
}
