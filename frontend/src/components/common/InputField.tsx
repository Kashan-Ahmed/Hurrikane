import React, { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, X } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  className?: string;
  error?: string;
  label?: string;
  clearAble?: boolean;
  onClear?: () => void;
}

const InputField = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { icon, className, type, error, label, onChange, clearAble, onClear, value } = props;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string | number | null = e.target.value as string;

    if (type === 'number') {
      inputValue = inputValue.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-period characters
      inputValue = inputValue.replace(/^0+(?!\.)/, '0'); // Prevent leading zeros (except for decimals)
      inputValue = inputValue.replace(/(\..*?)\.+/g, '$1'); // Prevent multiple decimals
      if (inputValue === '.') inputValue = ''; // Prevent "." alone

      inputValue = inputValue ? Number(inputValue) : null; // Convert to number, or null if empty
    }

    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: inputValue as any,
        },
      });
    }
  };

  const fieldType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div>
      {label && <label className="mb-1 block text-[13px] text-black">{label}</label>}
      <div className="relative overflow-hidden rounded-lg">
        {icon && type !== 'password' && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary">{icon}</span>
        )}
        {type === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
          >
            <Eye className={cn('size-5', showPassword && 'hidden')} />
            <EyeOff className={cn('size-5', !showPassword && 'hidden')} />
          </span>
        )}
        {clearAble && onClear && (
          <span
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm p-0.5 text-zinc-500 hover:bg-primary/10"
          >
            <X className={cn('size-4')} />
          </span>
        )}
        <Input
          {...props}
          className={cn(
            'text-secondary-1 h-[34px] rounded-lg border-gray-400 bg-transparent bg-white px-3 py-1 text-sm font-medium !text-black',
            'transition-all delay-100 hover:border-primary',
            'outline-none placeholder:text-xs placeholder:font-normal placeholder:leading-none placeholder:text-secondary/90',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            icon && 'pr-14',
            className && className
          )}
          value={type === 'number' ? (value ? Number(value) : undefined) : value}
          type={fieldType}
          onChange={handleChange}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">* {error}</p>}
    </div>
  );
};

export default InputField;
