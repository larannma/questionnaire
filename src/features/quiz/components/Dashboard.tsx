import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Button } from '@/components/ui/button';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  gap: 0.5rem;
`;


interface DashboardProps {
  onRestart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onRestart }) => {
  const { questions, answers } = useAppSelector((state) => state.quiz);

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
      <h2>Results</h2>
      {Object.entries(groupedResults).map(([difficulty, results]) => (
        <div key={difficulty}>
          <h3>{difficulty.toUpperCase()}</h3>
          {results.map((result, index) => (
            <p key={index}>
              <strong dangerouslySetInnerHTML={{ __html: result.question }} /> - {result.correct ? 'Correct' : 'Incorrect'}
            </p>
          ))}
        </div>
      ))}
      <Button onClick={onRestart}>Start Over</Button>
    </Wrapper>
  );
};

export default Dashboard;
