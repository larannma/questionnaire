import styled from 'styled-components';
import { Button } from "@/components/ui/button"
import { Checkbox } from './components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #D2EEF3;
`;

const Card = styled.div`
  padding: 2rem;
  width: 75%;
  min-height: 50vh;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Wrapper>
      <Card>
        <Button className="mb-4">Click me</Button>
        <Checkbox className="mb-4" />
        <RadioGroup className="mb-4">
          <RadioGroupItem value='test'>Test</RadioGroupItem>
        </RadioGroup>
        <Progress value={60} className="w-1/2" />
      </Card>
    </Wrapper>
  )
}

export default App;
