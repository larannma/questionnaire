import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import Question from './Question';


interface QuizProps {
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const { questions, currentQuestionIndex, loading, error } = useAppSelector((state) => state.quiz);

  useEffect(() => {
    console.log(questions, currentQuestionIndex)
    if (currentQuestionIndex >= questions.length) {
      onComplete();
    }
  }, [currentQuestionIndex, questions.length, onComplete]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      <Question />
    </div>
  );
};

export default Quiz;
