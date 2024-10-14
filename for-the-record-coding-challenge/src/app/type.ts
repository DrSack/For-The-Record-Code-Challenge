export enum ModeEnum {
  INITIAL = 'Initial',
  IN_PROGRESS = 'In Progress'
}

export interface Mode {
  placeholder: string,
  label: string
  type: ModeEnum
}

export interface InputMode {
  initial: Mode
  inProgress: Mode;
}

export interface FibonacciNumbers {
  [x: string]: number;
}
