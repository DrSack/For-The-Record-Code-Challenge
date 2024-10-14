export enum ModeEnum {
  INITIAL = 'Initial',
  IN_PROGRESS = 'In Progress',
  IN_PROGRESS2 = 'In Progress 2',
}

export interface Mode {
  placeholder: string;
  label: string;
  type: ModeEnum;
}

export interface InputMode {
  initial: Mode;
  inProgress: Mode;
  inProgress2: Mode;
}

export interface FibonacciNumbers {
  [x: string]: number;
}
