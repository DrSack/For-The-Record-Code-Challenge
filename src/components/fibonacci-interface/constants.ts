import { InputMode, ModeEnum } from "./types";

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