import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import quizReducer, { fetchQuestions } from './quizSlice';

jest.mock('axios');

describe('тест асинхронных экшенов', () => {
  test('получаем вопросы', async () => {
    const mockQuestions = [
      {
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['London', 'Berlin', 'Madrid'],
        difficulty: 'easy',
        type: 'multiple',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        correct_answer: 'Mars',
        incorrect_answers: ['Earth', 'Jupiter', 'Saturn'],
        difficulty: 'medium',
        type: 'multiple',
      },
    ];

    (axios.get as jest.Mock<typeof axios.get>).mockResolvedValue({ data: { results: mockQuestions } });

    const store = configureStore({
      reducer: { quiz: quizReducer },
    });

    await store.dispatch(fetchQuestions({ amount: 2 }));

    const { questions } = store.getState().quiz;

    expect(questions).toEqual(mockQuestions);
  });
});
