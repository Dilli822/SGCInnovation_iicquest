import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderPublic from "../header/header_public";
import AppFooter from "../footer/footer";
import {
  Container,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import Question from "./appitude"; // Assuming you have a Question component
import PieChartComponent from "../charts/pieChart";
import { Pie } from "react-chartjs-2";


const questionsData = {
  questions: [
    {
      id: 1,
      question:
        "How often do you feel overwhelmed with your schoolwork and extracurricular activities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
      category: "stress",
    },
    {
      id: 2,
      question:
        "In the past month, how often have you felt nervous or stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
      category: "anxiety",
    },
    {
      id: 3,
      question:
        "How often do you find it difficult to concentrate on your studies due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "stress",
    },
    {
      id: 4,
      question:
        "Do you often feel tired or lack energy even after sleeping well?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "depression",
    },
    {
      id: 5,
      question:
        "How often do you worry about your future or college applications?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
      category: "anxiety",
    },
    {
      id: 6,
      question:
        "Do you experience headaches or other physical symptoms due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "stress",
    },
    {
      id: 7,
      question: "How often do you feel you have too many responsibilities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
      category: "stress",
    },
    {
      id: 8,
      question:
        "Do you feel you have a healthy balance between schoolwork and leisure activities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
      category: "normal",
    },
    {
      id: 9,
      question:
        "How often do you feel you lack control over the important things in your life?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
      category: "depression",
    },
    {
      id: 10,
      question: "Do you have trouble sleeping due to stress or anxiety?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "anxiety",
    },
    {
      id: 11,
      question:
        "How often do you feel under pressure to perform well academically?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 5,
      category: "stress",
    },
    {
      id: 12,
      question:
        "Do you feel supported by friends or family when you are stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
      category: "normal",
    },
    {
      id: 13,
      question:
        "How often do you find yourself irritable or angry due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "stress",
    },
    {
      id: 14,
      question:
        "Do you find it hard to relax or calm down when you're stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "anxiety",
    },
    {
      id: 15,
      question: "How often do you feel lonely or isolated when stressed?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "depression",
    },
    {
      id: 16,
      question:
        "Do you find it difficult to keep up with your hobbies or interests due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
      category: "normal",
    },
    {
      id: 17,
      question:
        "How often do you experience changes in your appetite due to stress?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
      category: "depression",
    },
    {
      id: 18,
      question:
        "Do you feel confident in your ability to handle personal problems?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
      category: "normal",
    },
    {
      id: 19,
      question:
        "How often do you feel that stress affects your relationships with friends or family?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 4,
      category: "stress",
    },
    {
      id: 20,
      question:
        "Do you feel you have enough time for yourself despite your responsibilities?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weightage: 3,
      category: "normal",
    },
  ],
};

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

  const handleSkipQuestion = () => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: "Skipped",
    });
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    const categoryScores = {
      stress: 0,
      anxiety: 0,
      depression: 0,
      normal: 0,
    };

    questionsData.questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer === question.options[4]) {
        categoryScores[question.category] += question.weightage;
      }
    });

    return categoryScores;
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
    const categoryScores = calculateScore();
    const totalWeightage = questionsData.questions.reduce(
      (total, question) => total + question.weightage,
      0
    );

    const percentageScores = {
      stress: ((categoryScores.stress / totalWeightage) * 60).toFixed(2),
      anxiety: ((categoryScores.anxiety / totalWeightage) * 60).toFixed(2),
      depression: ((categoryScores.depression / totalWeightage) * 60).toFixed(2),
      normal: 40,
    };

    const data = {
      labels: ["Stress", "Anxiety", "Depression", "Normal"],
      datasets: [
        {
          data: [
            percentageScores.stress,
            percentageScores.anxiety,
            percentageScores.depression,
            percentageScores.normal,
          ],
          backgroundColor: ["red", "blue", "yellow", "green"],
          borderColor: ["red", "blue", "yellow", "green"],
          borderWidth: 1,
        },
      ],
    };

    return (
      <>
      <HeaderPublic/>
      <br /> <br />
      <Container maxWidth={"lg"}>
          <Grid container sx={{ display: "flex", alignItems: "center"}}>
          <Grid item md={7}>
          <Typography variant="h3">Aptitude Test Results</Typography>
          <Typography variant="h5">
            Your score breakdown:
          </Typography>
          <Typography variant="h6">
            Stress: {percentageScores.stress}% | Anxiety:{" "}  {percentageScores.anxiety}% | Depression:{" "} {percentageScores.depression}% | Normal: {percentageScores.normal}% 
          </Typography>
          <br />
          <Link to="/">
            <Button variant="outlined">
              Back to Home
            </Button>
          </Link>
          </Grid>

          <Grid item md={5} sx={{ mt: 3 }}>
              <Pie data={data} />
            </Grid>


        </Grid>
      </Container>
      <br /> <br />
            <AppFooter />
            </>
    );
  }

  const currentQuestion = questionsData.questions[currentQuestionIndex];

  return (
    <>

      <Question
        question={`${currentQuestion.id}. ${currentQuestion.question}`}
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
          &nbsp;&nbsp;
          {currentQuestionIndex < questionsData.questions.length - 1 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSkipQuestion}
              sx={{ mr: 2 }}
            >
              Skip
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
      <br /> <br /> <br /> <br /> <br /> <br />
      <AppFooter />
    </>
  );
};

export default AptitudeTest;
