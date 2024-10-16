import { Button } from "@mui/material"
import { StyledInputContainer } from "./style";

interface ButtonControlsProps {
  onSubmit: () => void;
  onHalt: () => void;
  onResume: () => void;
  onQuit: () => void;
}

export const ButtonControls = ({ onSubmit, onHalt, onResume, onQuit }: ButtonControlsProps) => {
  return (
    <StyledInputContainer>
      <Button onClick={onSubmit} variant='contained'>Submit</Button>
      <Button color='success' onClick={onHalt} variant='contained'>Halt</Button>
      <Button color='warning' onClick={onResume} variant='contained'>Resume</Button>
      <Button color='error' onClick={onQuit} variant='contained'>Quit</Button>
    </StyledInputContainer>
  )
}