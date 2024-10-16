import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface QuitDialogProps {
  quit: boolean
}

export const QuitDialog = ({ quit }: QuitDialogProps) => {
  // Refresh page when dialog is closed to terminate/reset
  const handleClose = () => window.location.reload()

  return (
    <Dialog
      open={quit}
      onClose={handleClose}
    >
      <DialogTitle>
        Terminate App
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Thank you for playing!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}