import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type TProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  errorMsg?: string;
};

export function DatePicker({ value, label, onChange, errorMsg }: TProps) {
  return (
    <div>
      {label && <label className="mb-1 block text-[13px] text-black">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'h-[34px] w-full justify-start rounded-lg border-gray-400 bg-white text-left font-normal hover:border-primary hover:bg-white',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-1 h-4 w-4" />
            {value ? format(value, 'PPP') : <span className="text-primary">Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
        </PopoverContent>
      </Popover>
      {errorMsg && <p className="mt-1 text-xs text-red-600">* {errorMsg}</p>}
    </div>
  );
}
