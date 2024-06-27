import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "J.K. Rowling",
      "F. Scott Fitzgerald",
    ],
    correctAnswer: "Harper Lee",
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
  },
  {
    id: 4,
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    id: 5,
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  // Add more questions here...
];


const positiveAffirmations = [
  "You are capable of overcoming any challenge.",
  "You are valued and loved just as you are.",
  "You have the strength to keep going, even when it's tough.",
  "You are not alone. Reach out for support when you need it.",
  // Add more affirmations as needed...
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
      setAnsweredCorrectly(true);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
      setAnsweredCorrectly(false);
    }

    // Move to the next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
    }
  };

  const handleSkipQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
    }
  };

  const isOptionSelected = (option) => {
    return option === selectedOption;
  };

  const calculateScorePercentage = () => {
    const totalQuestions = quizQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    return percentage.toFixed(2);
  };

  return (
    <> 
    <hr />     <br />
                 <Typography variant="h4">
                  Quiz Time 
             
              </Typography>
         
      <div className="quiz-container">
      <br />
        {!showScore ? (
          <Card variant="outlined" className="question-section">
            <CardContent>
              <Typography variant="h6">
                Question {currentQuestion + 1}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {quizQuestions[currentQuestion].question}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant="outlined"
                      fullWidth
                      style={{
                        borderColor: isOptionSelected(option)
                          ? "#000"
                          : "black",
                        backgroundColor: isOptionSelected(option)
                          ? "#00752f"
                          : "#fff",
                        borderWidth: "2px",
                        borderRadius: "4px",
                        color: isOptionSelected(option)
                          ? "#fff"
                          : "#000",
                      }}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                marginTop={2}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    disabled={currentQuestion === quizQuestions.length - 1}
                    onClick={handleSkipQuestion}
                  >
                    Skip
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Card variant="outlined" className="score-section">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quiz Results
              </Typography>
              <Typography variant="body1">
                Correct Answers: {correctAnswers} / {quizQuestions.length}
              </Typography>
              <Typography variant="body1">
                Incorrect Answers: {incorrectAnswers} / {quizQuestions.length}
              </Typography>
              <Typography variant="body1">
                Total Score: {score} / {quizQuestions.length}
              </Typography>
              <Typography variant="body1">
                Score Percentage: {calculateScorePercentage()}%
              </Typography>
            </CardContent>
            {/* Display correct answers */}
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
                Correct Answers:
              </Typography>
              {quizQuestions.map((question) => (
                <Typography key={question.id} variant="body1" gutterBottom>
                  {question.question} - {question.correctAnswer}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Display positive affirmations */}
        <br />
        {/* <div className="affirmation-section">
          <Typography variant="h6" gutterBottom>
            Positive Affirmation:
          </Typography>
          <Typography variant="body1">
            {positiveAffirmations[currentQuestion % positiveAffirmations.length]}
          </Typography>
        </div> */}

      </div>

   
    </>
  );
}

export default Quiz;
