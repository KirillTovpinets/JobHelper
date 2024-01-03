import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Question } from "../../apiClient";
import CopyButton from "../CopyButton";

function QuestionLayout({
  question,
  isCopied,
  setCopied,
  keyNumber,
}: {
  question: Question;
  isCopied: boolean;
  keyNumber: number;
  setCopied: (value: string) => void;
}) {
  return (
    <Box sx={{ minWidth: 400, maxWidth: 600 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {question.title} #{keyNumber}
          </Typography>
          <Typography variant="body2">
            {question.extendedContent?.markdown || question.content}
          </Typography>
        </CardContent>
        <CardActions>
          <CopyButton
            text={question.extendedContent?.markdown || question.content || ""}
            isCopied={isCopied}
            setCopied={setCopied}
          />
        </CardActions>
      </Card>
    </Box>
  );
}

export default QuestionLayout;
