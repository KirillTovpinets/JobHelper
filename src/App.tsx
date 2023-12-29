import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { Question, fetchQuestions } from "./apiClient";
import QuestionLayout from "./components/Question";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    fetchQuestions().then((list) => {
      setQuestions(list);
    });
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {questions.map((item) => (
        <QuestionLayout
          question={item}
          isCopied={copiedText === item.content}
          setCopied={(value) => setCopiedText(value)}
        />
      ))}
    </Box>
  );
}

export default App;
