import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DialogBox = ({ open, onClose, title, content, showCancelButton, confirmText, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <p>{content}</p>
      </DialogContent>
      <DialogActions>
        { showCancelButton && <Button onClick={onClose} color="primary">Cancel</Button>}
        <Button onClick={onConfirm} color="primary" variant="contained">{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
