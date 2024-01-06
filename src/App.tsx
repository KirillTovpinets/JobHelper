import { Box, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { Question, fetchJobData } from "./apiClient";
import QuestionLayout from "./components/Question";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [copiedText, setCopiedText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [position, setPosition] = useState("Front End Developer");
  const [company, setCompany] = useState("");
  const [companyPlaceholder, setCompanyPlaceholder] = useState("1company1");
  const [positionPlr, setPositionPlaceholder] = useState("1position1");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyValue = (value: string) => {
    setCopiedText(value);
    setSuccessMessage(value.slice(0, 50).concat("...") + " is copied");
  };
  const handleReplacePlaceholders = () => {
    if (company === "" || position === "") {
      return;
    }
    const companyPlaceholderRegExp = new RegExp(companyPlaceholder, "g");
    const positionPlaceholderRegExp = new RegExp(positionPlr, "g");

    const updatedQuestions = questions.map((q) => {
      let newContent = q.content?.replace(companyPlaceholderRegExp, company);
      newContent = newContent?.replace(positionPlaceholderRegExp, position);
      let extendedContent = q.extendedContent?.markdown?.replace(
        companyPlaceholderRegExp,
        company
      );

      extendedContent = extendedContent?.replace(
        positionPlaceholderRegExp,
        position
      );

      console.log(extendedContent);

      return {
        ...q,
        content: newContent,
        extendedContent: {
          markdown: extendedContent,
        },
      };
    });

    let updatedCoverLetter = coverLetter.replace(
      positionPlaceholderRegExp,
      position
    );
    updatedCoverLetter = updatedCoverLetter.replace(
      companyPlaceholder,
      company
    );
    setCompanyPlaceholder(company);
    setPositionPlaceholder(position);
    setCoverLetter(updatedCoverLetter);
    setQuestions(updatedQuestions);
    setSuccessMessage(
      "Placeholders are replaced with " + position + " at " + company
    );
  };

  const handleCopyCL = () => {
    navigator.clipboard.writeText(coverLetter);
    setSuccessMessage("Cover Letter is Copied");
  };

  useEffect(() => {
    fetchJobData().then(({ questions, coverLetter }) => {
      setQuestions(questions);
      setCoverLetter(coverLetter.content.markdown!);
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code.match(/Digit\d/) !== null) {
        const keyNumber = parseInt(e.code.replace("Digit", ""));
        const value = questions[keyNumber - 1].content;
        const extendedContent =
          questions[keyNumber - 1].extendedContent?.markdown;
        setCopiedText(value || extendedContent || "");
        navigator.clipboard.writeText(value || extendedContent || "");
        setSuccessMessage(questions[keyNumber - 1].title + " is copied");
      } else if (e.code === "Enter") {
        handleReplacePlaceholders();
      } else if (e.code === "Space") {
        handleCopyCL();
      }
    };
    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [questions, coverLetter, position, company]);

  useEffect(() => {
    if (successMessage === "") {
      return;
    }
    setOpen(true);
  }, [successMessage]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={successMessage}
      />
      <Box sx={{ width: "100%", display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="Position"
          variant="outlined"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        />
        <TextField
          label="Company name"
          variant="outlined"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
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
          setCopied={handleCopyValue}
        />
      ))}
    </Box>
  );
}

export default App;
