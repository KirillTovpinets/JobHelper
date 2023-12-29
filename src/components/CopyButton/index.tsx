import { Button } from "@mui/material";

function CopyButton({
  text,
  isCopied,
  setCopied,
}: {
  text: string;
  isCopied: boolean;
  setCopied: (value: string) => void;
}) {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(text);
  };
  return (
    <Button
      variant={!isCopied ? "outlined" : "contained"}
      onClick={handleClick}
    >
      {isCopied ? "Copied" : "Copy"}
    </Button>
  );
}

export default CopyButton;
