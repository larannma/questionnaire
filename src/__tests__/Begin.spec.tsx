import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Begin from '../features/quiz/components/Begin';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';


const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

describe('Begin компонент', () => {
  test('Деактивация кнопки если количество вопросов выходит из допустимого диапазона', () => {
    const mockOnStart = jest.fn();

    render(
      <Provider store={store}>
        <Begin onStart={mockOnStart} />
      </Provider>
    );
    expect(screen.getByLabelText(/Choose number of questions/i)).toBeInTheDocument();


    const input = screen.getByLabelText(/Choose number of questions/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Begin Quiz/i });
    expect(button).toBeEnabled();

    fireEvent.change(input, { target: { value: '1' } });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: '5' } });
    expect(button).toBeEnabled();

    fireEvent.click(button);
    expect(mockOnStart).toHaveBeenCalled();
  });
});
