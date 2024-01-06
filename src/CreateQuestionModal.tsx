import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Question } from "./apiClient";

function CreateQuestionModal({
  open,
  handleClose,
  submit,
}: {
  open: boolean;
  handleClose: () => void;
  submit: (data: Question) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Create new question
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <TextField
            value={title}
            label="Title"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextField
            value={content}
            label="Content"
            multiline
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => submit({ title, content } as Question)}>
          Save
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateQuestionModal;
