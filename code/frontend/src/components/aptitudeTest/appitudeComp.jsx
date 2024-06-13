import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import Question from "./appitude"; // Assuming you have a Question component
import PieChartComponent from "../charts/pieChart";
import { Pie } from 'react-chartjs-2';
import AppFooter from "../footer/footer";

const questionsData = {
  questions: [
    {
      id: 1,
      question:
        "How often do you feel overwhelmed with your schoolwork and extracurricular activities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
    },
    {
      id: 2,
      question:
        "In the past month, how often have you felt nervous or stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
    },
    {
      id: 3,
      question:
        "How often do you find it difficult to concentrate on your studies due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 4,
      question:
        "Do you often feel tired or lack energy even after sleeping well?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 5,
      question:
        "How often do you worry about your future or college applications?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
    },
    {
      id: 6,
      question:
        "Do you experience headaches or other physical symptoms due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 7,
      question: "How often do you feel you have too many responsibilities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
    },
    {
      id: 8,
      question:
        "Do you feel you have a healthy balance between schoolwork and leisure activities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
    },
    {
      id: 9,
      question:
        "How often do you feel you lack control over the important things in your life?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
    },
    {
      id: 10,
      question: "Do you have trouble sleeping due to stress or anxiety?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 11,
      question:
        "How often do you feel under pressure to perform well academically?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
    },
    {
      id: 12,
      question:
        "Do you feel supported by friends or family when you are stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
    },
    {
      id: 13,
      question:
        "How often do you find yourself irritable or angry due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 14,
      question:
        "Do you find it hard to relax or calm down when you're stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 15,
      question: "How often do you feel lonely or isolated when stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 16,
      question:
        "Do you find it difficult to keep up with your hobbies or interests due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
    },
    {
      id: 17,
      question:
        "How often do you experience changes in your appetite due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
    },
    {
      id: 18,
      question:
        "Do you feel confident in your ability to handle personal problems?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
    },
    {
      id: 19,
      question:
        "How often do you feel that stress affects your relationships with friends or family?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
    },
    {
      id: 20,
      question:
        "Do you feel you have enough time for yourself despite your responsibilities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
    },
  ],
};
// Add more questions here

const AptitudeTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmitQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1000); // Simulate a delay for processing
  };

  const calculateScore = () => {
    let totalScore = 0;
    questionsData.questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer === question.options[4]) {
        totalScore += question.weightage;
      }
    });
    return totalScore;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const totalWeightage = questionsData.questions.reduce(
      (total, question) => total + question.weightage,
      0
    );

    var percentage = ((score / totalWeightage) * 100).toFixed(2);

    var remainder = (100 - percentage).toFixed(2);
    

  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [0, percentage, remainder],
        backgroundColor: ['red', 'blue', 'yellow'],
        borderColor: ['red', 'blue', 'yellow'],
        borderWidth: 1,
      },
    ],
  };
    return (
      <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4">Quiz Results</Typography>
        <Typography variant="h6">Your score: {percentage}%</Typography>
        <Link to="/">
        <Button variant="outlined" onClick={window.reload}>
        Back to Home
        </Button>
        </Link>
        {/* <Pie data={data} /> */}
      </Box>
    </Container>
    );
  }

  const currentQuestion = questionsData.questions[currentQuestionIndex];

  return (
    <>


     
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={answers[currentQuestionIndex] || ""}
        onChange={handleOptionChange}
      />
      <Container>
      <Box mt={2}>
        {currentQuestionIndex > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePreviousQuestion}
            sx={{ mr: 2 }}
          >
            Previous
          </Button>
        )}
        {currentQuestionIndex < questionsData.questions.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        )}
        {currentQuestionIndex === questionsData.questions.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitQuiz}
          >
            Submit
          </Button>
        )}
      </Box>
      </Container>
      <br />      <br />      <br />      <br />      <br />      <br />
    

      <AppFooter/>
    </>
  );
};

export default AptitudeTest;
