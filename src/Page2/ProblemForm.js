import React, { useState, useEffect, useContext } from 'react';
import './ProblemForm.css';
import { problems, correctAnswers } from './ProblemFormList';
import { ScoreContext } from '../App'; // ScoreContext import

import {Link} from 'react-router-dom';


const getRandomProblems = (allProblems, allCorrectAnswers, count) => {
  const shuffledIndexes = allProblems.map((_, index) => index).sort(() => 0.5 - Math.random());
  const selectedIndexes = shuffledIndexes.slice(0, count);
  return {
    selectedProblems: selectedIndexes.map(index => allProblems[index]),
    selectedCorrectAnswers: selectedIndexes.map(index => allCorrectAnswers[index])
  };
};

const ProblemForm = () => {
  const {score: User_Score ,setScore: setUserScore} = useContext(ScoreContext);

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [problemsSet, setProblemsSet] = useState([]);
  const [correctAnswersSet, setCorrectAnswersSet] = useState([]);
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [results, setResults] = useState(Array(5).fill(false));
  const [score, setScore] = useState(0);
  const [incorrectProblems, setIncorrectProblems] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    const { selectedProblems, selectedCorrectAnswers } = getRandomProblems(problems, correctAnswers, 5);
    setProblemsSet(selectedProblems);
    setCorrectAnswersSet(selectedCorrectAnswers);
    setAnswers(Array(5).fill(''));
    setResults(Array(5).fill(false));
  }, [currentSetIndex, incorrectProblems]);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleConfirm = () => {
    const newResults = answers.map((answer, index) => answer.trim() === correctAnswersSet[index]);
    setResults(newResults);
    const correctCount = newResults.filter(result => result).length;
    const currentScore = correctCount * 20;
    setUserScore(User_Score + currentScore);

    setScore(currentScore);

    const newIncorrectProblems = problemsSet.filter((_, index) => !newResults[index]);
    const newIncorrectAnswers = correctAnswersSet.filter((_, index) => !newResults[index]);

    let alertMessage = `이번 세트 점수: ${currentScore}점\n`;
    if (newIncorrectProblems.length > 0) {
      alertMessage += '틀린 문제의 정답:\n';
      newIncorrectProblems.forEach((problem, index) => {
        alertMessage += `${problem}: ${newIncorrectAnswers[index]}\n`;
      });
    }

    alert(alertMessage);

    setIncorrectProblems([...incorrectProblems, ...newIncorrectProblems]);
    setIncorrectAnswers([...incorrectAnswers, ...newIncorrectAnswers]);

    if (newIncorrectProblems.length > 0) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else {
      alert("모든 문제를 완료했습니다!");
      setIncorrectProblems([]);
      setIncorrectAnswers([]);
      setCurrentSetIndex(0);
    }
  };

  return (
    <div className="problem-form">
      <h1>다음 속담의 틀린 부분을 바르게 고친 후 따라 읽어 보세요 (1~5)</h1>
      {problemsSet.map((problem, index) => (
        <div key={index} className="answer-section">
          <p>{problem}</p>
          <input
            type="text"
            value={answers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Answer ${index + 1}`}
          />
        </div>
      ))}
      <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default ProblemForm;
