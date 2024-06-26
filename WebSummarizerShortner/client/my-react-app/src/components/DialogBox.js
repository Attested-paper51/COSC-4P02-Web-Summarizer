import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
/**
 * DialogBox defines the dialog box used for error messages and pop ups throughout the website
 * @param {*} param0 
 * @returns 
 */
const DialogBox = ({ open, onClose, title, content, showCancelButton, showConfirmButton, confirmText, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <p>{content}</p>
      </DialogContent>
      <DialogActions>
        { showCancelButton && <Button onClick={onClose} color="primary">Cancel</Button> }
        { showConfirmButton && <Button onClick={onConfirm} color="primary" variant="contained">{confirmText}</Button> }
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
