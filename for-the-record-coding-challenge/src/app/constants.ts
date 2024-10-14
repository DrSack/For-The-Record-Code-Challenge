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
  }
}
