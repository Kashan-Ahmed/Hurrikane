import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface IProps {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({ open, title, description, children, footer }: IProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-xl gap-0 rounded-xl p-0">
        <DialogHeader className="border-b border-b-zinc-300 px-6 py-4">
          <DialogTitle className="text-base">{title}</DialogTitle>
          {description && (
            <DialogDescription className="!mt-0 text-[13px] text-zinc-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="px-6 pb-8 pt-6">{children}</div>

        {footer && <div className="w-full border-t border-t-zinc-300">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
