import { getFibonacciSequence } from "@/helpers";
import { InputMode, ModeEnum } from "./type";

export const MODE: InputMode = {
  initial: {
    placeholder: 'Number of Seconds',
    label: 'Please input the number of time in seconds between emitting numbers and their frequency',
    type: ModeEnum.INITIAL
  },
  inProgress: {
    placeholder: 'First Number',
    label: 'Please enter the first number',
    type: ModeEnum.IN_PROGRESS
  },
  inProgress2: {
    placeholder: 'Next Number',
    label: 'Please enter the next number',
    type: ModeEnum.IN_PROGRESS2
  },
}

export const FIRST_1000_FIBONACCI_NUMBERS = getFibonacciSequence(1000)

