import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from './Button';

type TProps = {
  open: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  description: string;
};

const DeleteConfirm = ({ open, isPending, onConfirm, onCancel, description }: TProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg gap-0 rounded-xl p-0">
        <DialogHeader className="px-6 py-6">
          <DialogTitle className="pb-1 text-xl">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="!mt-0 text-sm text-zinc-500">
            {description}
            {/* This action cannot be undone. Are you sure you want to permanently delete this file from
            our servers? */}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <div className="flex justify-end gap-4 px-6 py-5">
            <Button disabled={isPending} variant="secondary" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={isPending} onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirm;
