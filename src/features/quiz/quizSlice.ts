import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multiple' | 'boolean';
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: number]: { selected: string[]; isCorrect: boolean } };
  loading: boolean;
  error: string | null;
  correctAnswersCount: number; 
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  loading: false,
  error: null,
  correctAnswersCount: 0,
};


export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ amount }: { amount: number }) => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}`);
    return response.data.results;
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { questionIndex, answer, isCorrect } = action.payload;
      state.answers[questionIndex] = { selected: answer, isCorrect };
      if (isCorrect) {
        state.correctAnswersCount += 1;
      }
      state.currentQuestionIndex += 1;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.questions = [];
      state.error = null;
      state.correctAnswersCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.error.message || 'error in fetching';
        state.loading = false;
      });
  },
});

export const { answerQuestion, resetQuiz } = quizSlice.actions;

export const selectQuizStatus = (state: { quiz: QuizState }) => state.quiz.loading;
export const selectCorrectAnswersCount = (state: { quiz: QuizState }) => state.quiz.correctAnswersCount;

export default quizSlice.reducer;

export type { QuizState };
