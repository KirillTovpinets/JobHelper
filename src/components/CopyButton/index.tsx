import { Button } from "@mui/material";

function CopyButton({ text }: { text: string }) {
  const handleClick = () => navigator.clipboard.writeText(text);
  return <Button onClick={handleClick}>Copy</Button>;
}

export default CopyButton;
