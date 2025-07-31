import React, { Fragment } from 'react';
import { Checkbox as CheckBoxUI } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  name: string;
  label?: string | React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
  styles?: {
    checkbox?: string;
  };
}

const Checkbox = ({ name, label, checked, onChange, styles, disabled }: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckBoxUI
        id={name}
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          'border-gray-400 shadow-none data-[state=checked]:border-primary',
          styles?.checkbox && styles.checkbox
        )}
        disabled={disabled}
      />
      {label && (
        <Fragment>
          {typeof label === 'string' ? (
            <label
              htmlFor={name}
              className="text-[13px] leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          ) : (
            <Fragment>{label}</Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Checkbox;
