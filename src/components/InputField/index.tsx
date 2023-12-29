import { FormGroup, Input } from "@mui/material";

function InputField({ value }: { value: string }) {
  return (
    <FormGroup>
      <Input value={value} />
    </FormGroup>
  );
}

export default InputField;
