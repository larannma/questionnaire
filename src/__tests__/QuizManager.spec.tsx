import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizManager from '@/features/quiz/components/QuizManager';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '@/features/quiz/quizSlice';
import { useAppSelector } from '@/hooks/useAppSelector';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

jest.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('@/hooks/useAppSelector', () => ({
  useAppSelector: jest.fn(),
}));

describe('QuizManager Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Begin component initially', () => {
    render(
      <Provider store={store}>
        <QuizManager />
      </Provider>
    );

    expect(screen.getByText(/Choose number of questions/i)).toBeInTheDocument();
  });

  test('displays loading message when loading is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue(true);

    render(
      <Provider store={store}>
        <QuizManager />
      </Provider>
    );

    expect(screen.getByText(/loading .../i)).toBeInTheDocument();
  });

  test('renders Quiz component after starting the quiz', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <QuizManager />
      </Provider>
    );

    const startButton = screen.getByRole('button', { name: /Begin Quiz/i });
    fireEvent.click(startButton);

    expect(screen.getByText(/Quiz Component/i)).toBeInTheDocument();
  });

  test('renders Dashboard component after completing the quiz', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <QuizManager />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Begin Quiz/i }));
    fireEvent.click(screen.getByRole('button', { name: /Complete Quiz/i }));

    expect(screen.getByText(/Dashboard Component/i)).toBeInTheDocument();
  });

  test('restarts the quiz and resets state', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <QuizManager />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Begin Quiz/i }));
    fireEvent.click(screen.getByRole('button', { name: /Complete Quiz/i }));
    fireEvent.click(screen.getByRole('button', { name: /Restart Quiz/i })); 

    expect(screen.getByText(/Choose number of questions/i)).toBeInTheDocument();
  });
});
