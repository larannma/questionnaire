import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Button } from '@/components/ui/button';
import { selectCorrectAnswersCount } from '../quizSlice';

const DifficultyText = styled.h3<{ difficulty: 'easy' | 'medium' | 'hard' }>`
  color: ${({ difficulty }) =>
    difficulty === 'easy' ? 'green' :
    difficulty === 'medium' ? 'orange' :
    difficulty === 'hard' ? 'coral' :
    'black'};
  font-weight: bold;
  font-size: 1.5rem;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 2.5rem;
`;


interface DashboardProps {
  onRestart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onRestart }) => {
  const correctAnswersCount = useAppSelector(selectCorrectAnswersCount);
  const { questions, answers } = useAppSelector((state) => state.quiz);

  const correctPercentage = (correctAnswersCount / questions.length) * 100;

  const groupedResults = questions.reduce(
    (acc, question, index) => {
      const result = answers[index];
      const correct = result?.isCorrect || false;
      acc[question.difficulty].push({ question: question.question, correct });
      return acc;
    },
    { easy: [], medium: [], hard: [] } as { [key: string]: { question: string; correct: boolean }[] }
  );

  return (
    <Wrapper>
      <h2 className='text-xl font-semibold'>
        Results {`${correctAnswersCount}/${questions.length}  `}
        {correctPercentage > 30 ? '🥳' : '😓'}
      </h2>
      {Object.entries(groupedResults).map(([difficulty, results]) => (
        <div key={difficulty}>
          <DifficultyText difficulty={difficulty as 'easy' | 'medium' | 'hard'}>
            {difficulty.toUpperCase()}
          </DifficultyText>
          {results.length > 0 ? (
            results.map((result, index) => (
              <p key={index}>
                <strong dangerouslySetInnerHTML={{ __html: result.question }} /> - {result.correct ? '✅' : '❌'}
              </p>
            ))
          ) : (
            <p className='text-md font-semibold'>No {difficulty} level questions.</p>
          )}
        </div>
      ))}
      <Button onClick={onRestart}>Start Over</Button>
    </Wrapper>
  );
};

export default Dashboard;
