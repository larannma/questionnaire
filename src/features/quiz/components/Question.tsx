import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { answerQuestion } from '../quizSlice';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  gap: 2.5rem;
`;

const QuestionText = styled.h2`
  font-size: 1.5em;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuestionCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex } = useAppSelector((state) => state.quiz);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const question = questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedOptions([]);
  }, [currentQuestionIndex]);

  if (!question) {
    return <p className='text-xl font-semibold'>Loading question...</p>;
  }

  const handleSelect = (option: string) => {
    if (question.type === 'multiple') {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleSubmit = () => {
    const isCorrect =
      question.type === 'multiple'
        ? selectedOptions.sort().join(',') === question.correct_answer.split(',').sort().join(',')
        : selectedOptions.length === 1 && selectedOptions[0] === question.correct_answer;

    dispatch(answerQuestion({ questionIndex: currentQuestionIndex, answer: selectedOptions, isCorrect }));
  };

  return (
    <Card>
      <QuestionText dangerouslySetInnerHTML={{ __html: question.question }} />
      <Options>
        {question.type === 'multiple' ? (
          question.incorrect_answers.concat(question.correct_answer).sort().map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`checkbox-${index}`}
                checked={selectedOptions.includes(option)}
                onCheckedChange={() => handleSelect(option)}
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))
        ) : (
          <RadioGroup
            value={selectedOptions[0]}
            onValueChange={(value) => handleSelect(value)}
          >
            {question.incorrect_answers.concat(question.correct_answer).sort().map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`radio-${index}`} />
                <Label htmlFor={`radio-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </Options>
      <Button onClick={handleSubmit} disabled={selectedOptions.length === 0}>
        Next
      </Button>
    </Card>
  );
};

export default QuestionCard;
