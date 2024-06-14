
// import AppFooter from '../Footer/AppFooter'
import HeaderNav from "../header/header";
import Banner from "../Banner/Banner";
import TipsCards from "../TipsCards/TipsCards";
import AppFooter from "../footer/footer";
import Notification from "../Notifications/Notifications";
import HeaderPublic from "../header/header_public";
import { useNavigate } from "react-router-dom";
import LandingPage from "../LandingPage/LadingPage";
import React, { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  ListItem,
  ListItemText,
  TextField,
  Menu,
  MenuItem,
  useMediaQuery,
  createTheme, // Import createTheme
} from "@mui/material";
import "./quizGame.css";
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
  {
    id: 6,
    question: "What is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Tibia", "Fibula"],
    correctAnswer: "Stapes",
  },
  {
    id: 7,
    question: "Who is the author of '1984'?",
    options: [
      "George Orwell",
      "Aldous Huxley",
      "Ray Bradbury",
      "J.R.R. Tolkien",
    ],
    correctAnswer: "George Orwell",
  },
  {
    id: 8,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    correctAnswer: "Au",
  },
  {
    id: 9,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Neptune"],
    correctAnswer: "Mars",
  },
  {
    id: 10,
    question: "Who is credited with discovering penicillin?",
    options: [
      "Alexander Fleming",
      "Marie Curie",
      "Albert Einstein",
      "Isaac Newton",
    ],
    correctAnswer: "Alexander Fleming",
  },
  {
    id: 11,
    question: "Who is the creator of the theory of relativity?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Stephen Hawking",
      "Galileo Galilei",
    ],
    correctAnswer: "Albert Einstein",
  },
  {
    id: 12,
    question: "Which animal is known as the 'ship of the desert'?",
    options: ["Camel", "Horse", "Elephant", "Giraffe"],
    correctAnswer: "Camel",
  },
  {
    id: 13,
    question: "Who is the Greek god of the sea?",
    options: ["Poseidon", "Zeus", "Hades", "Apollo"],
    correctAnswer: "Poseidon",
  },
  {
    id: 14,
    question: "What is the largest ocean on Earth?",
    options: [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 15,
    question: "Who composed 'Symphony No. 9'?",
    options: [
      "Ludwig van Beethoven",
      "Wolfgang Amadeus Mozart",
      "Johann Sebastian Bach",
      "Franz Schubert",
    ],
    correctAnswer: "Ludwig van Beethoven",
  },
  {
    id: 16,
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correctAnswer: "Tokyo",
  },
  {
    id: 17,
    question: "Which country is famous for its tulips?",
    options: ["Netherlands", "France", "Italy", "Spain"],
    correctAnswer: "Netherlands",
  },
  {
    id: 18,
    question: "What is the main ingredient in guacamole?",
    options: ["Avocado", "Tomato", "Onion", "Pepper"],
    correctAnswer: "Avocado",
  },
  {
    id: 19,
    question: "What is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
  },
  {
    id: 20,
    question: "Who was the first man to step on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    correctAnswer: "Neil Armstrong",
  },
  {
    id: 21,
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Ir", "In", "Au"],
    correctAnswer: "Fe",
  },
  {
    id: 22,
    question: "What is the largest mammal in the world?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 23,
    question: "Which country is famous for the Great Barrier Reef?",
    options: ["Australia", "Brazil", "India", "Canada"],
    correctAnswer: "Australia",
  },
  {
    id: 24,
    question: "Who wrote 'Hamlet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Leo Tolstoy",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    id: 25,
    question: "What is the chemical symbol for sodium?",
    options: ["Na", "Ni", "Ne", "No"],
    correctAnswer: "Na",
  },
  {
    id: 26,
    question: "Which planet is known as the 'Morning Star'?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    correctAnswer: "Venus",
  },
  {
    id: 27,
    question: "Who is known as the 'Father of Computers'?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correctAnswer: "Charles Babbage",
  },
  {
    id: 28,
    question: "What is the largest organ in the human body?",
    options: ["Skin", "Liver", "Heart", "Brain"],
    correctAnswer: "Skin",
  },
  {
    id: 29,
    question: "What is the chemical symbol for silver?",
    options: ["Ag", "Au", "Si", "Sv"],
    correctAnswer: "Ag",
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
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      // End of quiz, show score
      setShowScore(true);
    }
  };

  return (
    <Container> 

    <hr />
    <br />

    <div className="quiz-container">
    <h4>
            Quiz Time
            </h4>

      {!showScore ? (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <div className="question-text">
            {quizQuestions[currentQuestion].question}
          </div>
          <div className="options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionSelect(option)}>
                {option}
              </button>
            ))}
          </div>
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
          </button>
        </div>
      ) : (
        <div className="score-section">
          <h2>Your Score: {score}</h2>
          {/* Add options for the user, like restarting quiz, etc. */}
        </div>
      )}

      {/* Display positive affirmations */}
      <div className="affirmation-section">
        <h3>Positive Affirmation:</h3>
        <p>
          {positiveAffirmations[currentQuestion % positiveAffirmations.length]}
        </p>
      </div>
    </div>
    </Container>
  );
}

export default Quiz;
