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
`;

// const Input = styled.input`
//   width: 50px;
//   padding: 5px;
//   font-size: 1em;
//   text-align: center;
//   border: 2px solid black;
//   border-radius: 10px;
// `;

interface BeginProps {
  onStart: () => void;
}

const Begin: React.FC<BeginProps> = ({ onStart }) => {
  const dispatch = useAppDispatch();
  const [questionCount, setQuestionCount] = useState(2);

  const isButtonDisabled = questionCount < 2 || questionCount > 10;

  const handleStartQuiz = () => {
    dispatch(fetchQuestions({ amount: questionCount }));
    onStart();
  };

  return (
    <Container>
      <InputContainer>
        <Label htmlFor="questionCount">Choose number if questions (from 2 to 10)</Label>
        <Input
          id="questionCount"
          type="number"
          min="1"
          max="50"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
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
