import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import Begin from './Begin';
import Quiz from './Quiz';
import Dashboard from './Dashboard';
import styled from 'styled-components';
import { resetQuiz, selectQuizStatus } from '../quizSlice';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  min-height: 50vh;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2rem;
`;

const QuizManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectQuizStatus);

  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = useCallback(() => {
    setQuizStarted(true);
    setShowResults(false);
  }, []);

  const handleQuizComplete = useCallback(() => {
    setQuizStarted(false);
    setShowResults(true);
  }, []);

  const handleRestartQuiz = useCallback(() => {
    dispatch(resetQuiz());
    setQuizStarted(false);
    setShowResults(false);
  }, [dispatch]);

  return (
    <Wrapper>
      {!quizStarted && !showResults && <Begin onStart={handleStartQuiz} />}
      {loading && <p>loading ...</p>}
      {quizStarted && !loading && !showResults && <Quiz onComplete={handleQuizComplete} />}
      {showResults && <Dashboard onRestart={handleRestartQuiz} />}
    </Wrapper>
  );
};

export default QuizManager;
