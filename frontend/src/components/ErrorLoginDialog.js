import React from 'react';

import { Button, Classes, Dialog } from "@blueprintjs/core";

export default function ErrorLoginDialog(props) {

  return (
    <Dialog
      icon="error"
      onClose={() => props.dismissError()}
      title="Login Error"
      isOpen={props.isOpen}
      usePortal
      canOutsideClickClose
      canEscapeKeyClose
      autoFocus
    >
      <div className={Classes.DIALOG_BODY}>
        <p>There was an error logging you in.</p>
        <p>The email and password combination was not found.</p>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={() => props.dismissError()}>Close</Button>
        </div>
      </div>
    </Dialog>
  );
}