import { Button } from "@mui/material"
import { StyledButtonControlsContainer } from "./style";

interface ButtonControlsProps {
  onSubmit: () => void;
  onHalt: () => void;
  onResume: () => void;
  onQuit: () => void;
}

export const ButtonControls = ({ onSubmit, onHalt, onResume, onQuit }: ButtonControlsProps) => {
  return (
    <StyledButtonControlsContainer data-testid='fibonacci-interface-button-container'>
      <Button
        onClick={onSubmit}
        variant='contained'
        data-testid='fibonacci-interface-submit-button'
      >
        Submit
      </Button>
      <Button
        color='success'
        onClick={onHalt}
        variant='contained'
        data-testid='fibonacci-interface-halt-button'
      >
        Halt
      </Button>
      <Button
        color='warning'
        onClick={onResume}
        variant='contained'
        data-testid='fibonacci-interface-resume-button'
      >
        Resume
      </Button>
      <Button
        color='error'
        onClick={onQuit}
        variant='contained'
        data-testid='fibonacci-interface-quit-button'>
        Quit
      </Button>
    </StyledButtonControlsContainer>
  )
}