import { FormGroup, Input } from "@mui/material";
import CopyButton from "../CopyButton";

function InputField({ value }: { value: string }) {
  return (
    <FormGroup>
      <Input value={value} />
      <CopyButton text={value} />
    </FormGroup>
  );
}

export default InputField;
