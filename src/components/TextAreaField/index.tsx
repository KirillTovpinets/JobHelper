import { FormGroup, TextareaAutosize } from "@mui/material";

function TextAreaField(props: { text: string }) {
  return (
    <FormGroup>
      <TextareaAutosize value={props.text} />
    </FormGroup>
  );
}

export default TextAreaField;
