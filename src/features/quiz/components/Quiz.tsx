import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import Question from './Question';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  gap: 2.5rem;
`;

interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const { questions, currentQuestionIndex, loading, error } = useAppSelector((state) => state.quiz);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      onComplete();
    }
  }, [currentQuestionIndex, questions, onComplete]);

  if (loading) return <p className='text-xl font-semibold'>Loading...</p>;
  if (error) return <p className='text-xl font-semibold'>Error: {error}</p>;


  return (
    <Wrapper>
      <h2 className='text-xl font-semibold'>{`${currentQuestionIndex + 1}/${questions.length}`}</h2>
      <Question />
    </Wrapper>
  );
};

export default Quiz;
