import { Fragment } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export function Popup({ title, primaryAction, secondaryAction, children }) {
  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={() => {}}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        {children}

        <DialogActions>
          <Button onClick={secondaryAction.handler}>
            {secondaryAction.text}
          </Button>
          <Button onClick={primaryAction.handler} autoFocus variant="contained">
            {primaryAction.text}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
