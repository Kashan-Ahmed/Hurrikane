import { useState } from 'react';
import { CirclePlay, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import Button from '@/components/common/Button';

type TProps = {
  url?: string;
  mini?: boolean;
  onDelete?: () => void;
};

const VideoPlayer = ({ url, mini = false, onDelete }: TProps) => {
  const [play, setPlay] = useState(false);

  return (
    <div className="h-full">
      {mini && (
        <span className="cursor-pointer" onClick={() => setPlay(true)}>
          <CirclePlay size={24} className="text-primary" />
        </span>
      )}

      {!mini && (
        <>
          {onDelete && (
            <div className="flex justify-end">
              <div
                className="absolute cursor-pointer rounded-full p-2 hover:bg-red-600 hover:text-white"
                onClick={onDelete}
              >
                <Trash2 />
              </div>
            </div>
          )}
          <div
            onClick={() => setPlay(true)}
            className="flex h-full cursor-pointer flex-col items-center gap-1 rounded-md bg-[#F0F0F3]/80 p-5 shadow-inner"
          >
            <span className="flex items-center justify-center rounded-md">
              <CirclePlay size={60} className="text-primary" />
            </span>
            <p className="text-xs font-medium text-primary">Play Video</p>
          </div>
        </>
      )}
      {url && play && (
        <Dialog open={play}>
          <DialogContent className="max-w-4xl gap-0 rounded-xl p-0">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b border-b-zinc-300 px-6 py-4">
              <DialogTitle className="text-base">Media Content</DialogTitle>
              <Button
                type="button"
                onClick={() => setPlay(false)}
                className="mt-0"
                variant="ghost"
                size="icon"
              >
                <X className="size-5" />
              </Button>
            </DialogHeader>

            <div className="px-6 pb-8 pt-6">
              <ReactPlayer muted url={url} controls width="100%" height="70vh" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VideoPlayer;
