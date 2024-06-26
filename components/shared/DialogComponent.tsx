'use client';

import { useSearchParams } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { Button } from '../ui/button';

type Props = {
  title: string;
  onClose: () => void;
  onOk: () => void;
  children: React.ReactNode;
};

const DialogComponent = ({ title, onClose, onOk, children }: Props) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get('showDialog');

  useEffect(() => {
    if (showDialog === 'y') {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  const dialog: JSX.Element | null =
    showDialog === 'y' ? (
      <dialog ref={dialogRef}>
        <div>
          <div>
            <h1>{title}</h1>
            <Button onClick={closeDialog}>x</Button>
          </div>
          <div>
            {children}
            <div>
              <Button onClick={clickOk}>ok</Button>
            </div>
          </div>
        </div>
      </dialog>
    ) : null;

  return dialog;
};

export default DialogComponent;
