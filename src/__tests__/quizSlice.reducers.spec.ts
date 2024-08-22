import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import quizReducer, { selectCorrectAnswersCount, QuizState } from '@/features/quiz/quizSlice';

describe('тесты селекторов', () => {
  test('селектор получения правильных ответов', () => {
    const preloadedState: { quiz: QuizState } = {
      quiz: {
        questions: [
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
        ],
        currentQuestionIndex: 2,
        answers: {
          0: { selected: ['Paris'], isCorrect: true },
          1: { selected: ['Mars'], isCorrect: true },
        },
        loading: false,
        error: null,
        correctAnswersCount: 2,
      },
    };

    const store = configureStore({
      reducer: {
        quiz: quizReducer,
      },
      preloadedState,
    });

    const correctAnswersCount = selectCorrectAnswersCount(store.getState());

    expect(correctAnswersCount).toBe(2);
  });
});