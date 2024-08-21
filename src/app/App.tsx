import styled from 'styled-components';
import QuizManager from '@/features/quiz/components/QuizManager';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #aedef9;
`;

function App() {
  return (
    <Wrapper>
      <QuizManager/>
    </Wrapper>
  )
}

export default App;
