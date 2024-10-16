import { TextField } from "@mui/material"

interface InputProps {
  placeholder: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const Input = ({ value, placeholder, label, onChange, onSubmit }: InputProps) => {
  return (
    <TextField
      placeholder={placeholder}
      label={label}
      value={value}
      variant='filled'
      autoComplete='off'
      onChange={(event) => onChange(event.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onSubmit()
      }}
      slotProps={{ inputLabel: { shrink: true } }}
      fullWidth
      autoFocus
    />
  )
}