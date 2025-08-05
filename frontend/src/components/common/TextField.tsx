import React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
  className?: string;
  error?: string;
  label?: string;
  rows?: number;
}

const TextField = (props: InputProps) => {
  const { className, error, label, onChange, rows = 3 } = props;

  return (
    <div>
      {label && <label className="mb-1 block text-[13px] text-black">{label}</label>}
      <div className="relative overflow-hidden rounded-lg">
        <Textarea
          {...props}
          className={cn(
            'text-secondary-1 rounded-lg border-gray-400 bg-transparent bg-white text-sm font-medium !text-black',
            'transition-all delay-100 hover:border-primary',
            'outline-none placeholder:text-xs placeholder:font-normal placeholder:text-secondary/90',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            className && className
          )}
          rows={rows}
          onChange={onChange}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">* {error}</p>}
    </div>
  );
};

export default TextField;
