import React, { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchQuestions } from '../quizSlice';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import img from '@/img/reading-book.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.5em;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

interface BeginProps {
  onStart: () => void;
}

const Begin: React.FC<BeginProps> = ({ onStart }) => {
  const dispatch = useAppDispatch();
  const [questionCount, setQuestionCount] = useState<number | ''>(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    
    if (value === '' || isNaN(parsedValue)) {
      setQuestionCount('');
    } else {
      setQuestionCount(parsedValue);
    }
  };

  const isButtonDisabled = typeof questionCount !== 'number' || questionCount < 2 || questionCount > 10;
  
  const handleStartQuiz = () => {
    if (!isButtonDisabled) {
      dispatch(fetchQuestions({ amount: questionCount as number }));
      onStart();
    }
  };

  return (
    <Container>
      <InputContainer>
        <Label htmlFor="questionCount">Choose number of questions (from 2 to 10)</Label>
        <Input
          id="questionCount"
          type="number"
          min="2"
          max="10"
          value={questionCount}
          onChange={handleChange}
        />
      </InputContainer>
      <Button size={'lg'} onClick={handleStartQuiz} disabled={isButtonDisabled}>
        Begin Quiz
      </Button>
      <img width={'250px'} src={img} alt='reading a book'></img>
    </Container>
  );
};

export default Begin;
