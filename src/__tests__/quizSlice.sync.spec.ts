import { expect, test, describe } from '@jest/globals';
import quizReducer, { answerQuestion, resetQuiz } from '@/features/quiz/quizSlice';

describe('тесты синхронных экшенов', () => {
  const initialState = {
    questions: [
      {
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['London', 'Berlin', 'Madrid'],
        difficulty: 'easy' as 'easy',
        type: 'multiple' as 'multiple',
      },
    ],
    currentQuestionIndex: 0,
    answers: {},
    loading: false,
    error: null,
    correctAnswersCount: 0,
  };

  test('answerQuestion должен обновлять состояние в случае верного ответа', () => {
    const newState = quizReducer(
      initialState,
      answerQuestion({ questionIndex: 0, answer: ['Paris'], isCorrect: true })
    );

    expect(newState.currentQuestionIndex).toBe(1);
    expect(newState.answers[0]).toEqual({ selected: ['Paris'], isCorrect: true });
    expect(newState.correctAnswersCount).toBe(1);
  });

  test('answerQuestion должен обновлять состояние в случае неверного ответа', () => {
    const newState = quizReducer(
      initialState,
      answerQuestion({ questionIndex: 0, answer: ['London'], isCorrect: false })
    );

    expect(newState.currentQuestionIndex).toBe(1);
    expect(newState.answers[0]).toEqual({ selected: ['London'], isCorrect: false });
    expect(newState.correctAnswersCount).toBe(0);
  });

  test('resetQuiz должен сбрасывать состояние до начального', () => {
    const modifiedState = {
      ...initialState,
      currentQuestionIndex: 2,
      answers: {
        0: { selected: ['Paris'], isCorrect: true },
        1: { selected: ['Berlin'], isCorrect: false },
      },
      correctAnswersCount: 1,
    };

    const newState = quizReducer(modifiedState, resetQuiz());

    expect(newState).toEqual({
      ...initialState,
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      correctAnswersCount: 0,
      error: null,
      loading: false,
    });
  });
});
