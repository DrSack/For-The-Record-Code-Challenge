import { FibonacciInterface } from '@/components';
import { FIRST_1000_FIBONACCI_NUMBERS } from './constants';
import { StyledBox } from './styles';

export default function Home() {
  return (
    <StyledBox>
      <FibonacciInterface fibonacciNumbersToCompare={FIRST_1000_FIBONACCI_NUMBERS} />
    </StyledBox>
  );
}
