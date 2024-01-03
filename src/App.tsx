import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { Question, fetchJobData } from "./apiClient";
import QuestionLayout from "./components/Question";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [copiedText, setCopiedText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    fetchJobData().then(({ questions, coverLetter }) => {
      setQuestions(questions);
      setCoverLetter(coverLetter.content.markdown!);
      document.addEventListener("keypress", (e) => {
        if (e.code.match(/Digit\d/) !== null) {
          const keyNumber = parseInt(e.code.replace("Digit", ""));
          const value = questions[keyNumber - 1].content;
          const extendedContent =
            questions[keyNumber - 1].extendedContent?.markdown;
          setCopiedText(value || extendedContent || "");
          navigator.clipboard.writeText(value || extendedContent || "");
        }
      });
    });
  }, []);

  const handleReplacePlaceholders = () => {
    const companyPlaceholder = new RegExp(`1company1`, "g");
    const positionPlaceholder = new RegExp("1position1", "g");

    const updatedQuestions = questions.map((q) => {
      let newContent = q.content?.replace(companyPlaceholder, company);
      newContent = newContent?.replace(positionPlaceholder, position);
      let extendedContent = q.extendedContent?.markdown?.replace(
        companyPlaceholder,
        company
      );

      extendedContent = extendedContent?.replace(positionPlaceholder, position);

      return {
        ...q,
        content: newContent,
        extendedContent: {
          markdown: extendedContent,
        },
      };
    });

    let updatedCoverLetter = coverLetter.replace(positionPlaceholder, position);
    updatedCoverLetter = updatedCoverLetter.replace(
      companyPlaceholder,
      company
    );
    debugger;
    setCoverLetter(updatedCoverLetter);
    setQuestions(updatedQuestions);
  };

  const handleCopyCL = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Box sx={{ width: "100%", display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="Position"
          variant="outlined"
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label="Company name"
          variant="outlined"
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button variant="contained" onClick={handleReplacePlaceholders}>
          Update All
        </Button>
        <Button variant="contained" onClick={handleCopyCL}>
          Cover Letter
        </Button>
      </Box>
      {questions.map((item, index) => (
        <QuestionLayout
          key={item.title.replace(" ", "-")}
          keyNumber={index + 1}
          question={item}
          isCopied={
            copiedText === item.extendedContent?.markdown ||
            copiedText === item.content
          }
          setCopied={(value) => setCopiedText(value)}
        />
      ))}
    </Box>
  );
}

export default App;
