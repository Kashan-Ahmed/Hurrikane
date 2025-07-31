import React, { Fragment } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

export const buttonVariants = cva(
  `inline-flex items-center gap-1 whitespace-nowrap rounded-lg justify-center text-[13px] leading-[1rem] px-4 py-1
  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
  disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-semibold`,
  {
    variants: {
      variant: {
        primary: cn(
          'bg-primary text-primary-foreground',
          'bg-[linear-gradient(180deg,rgba(48,48,48,0)_63.53%,hsla(0,0%,100%,0.15)_100%)]',
          'shadow-[inset_0rem_-0.0625rem_0rem_0.0625rem_rgba(0,0,0,0.8),inset_0rem_0rem_0rem_0.0625rem_#303030,inset_0rem_0.03125rem_0rem_0.09375rem_hsla(0,0%,100%,0.25)]'
        ),
        secondary: cn(
          'bg-white text-secondary-foreground',
          'shadow-[inset_0rem_-0.0625rem_0rem_0rem_#b5b5b5,inset_0rem_0rem_0rem_0.0625rem_rgba(0,0,0,0.1),inset_0rem_0.03125rem_0rem_0.09375rem_#fff]'
        ),
        destructive: cn(
          'bg-destructive text-primary-foreground',
          'shadow-[inset_0rem_-0.0625rem_0rem_0.0625rem_rgba(142,31,11,0.8),inset_0rem_0rem_0rem_0.0625rem_rgba(181,38,11,0.8),inset_0rem_0.03125rem_0rem_0.09375rem_hsla(0,0%,100%,0.349)]'
        ),
        outline:
          'border border-primary bg-transparent hover:bg-primary/10 text-secondary-foreground',
        ghost: 'hover:bg-primary/10 hover:text-accent-foreground',
        link: 'text-secondary-1 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8',
        sm: 'h-7',
        lg: 'h-11',
        xl: 'h-15',
        icon: 'h-8 w-8 justify-center',
      },
      isLoading: {
        true: 'justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPlacement?: 'start' | 'end';
}

const Button = (props: ButtonProps) => {
  const {
    variant,
    size,
    className,
    children,
    isLoading,
    disabled,
    onClick,
    icon,
    iconPlacement = 'start',
    type,
  } = props;
  return (
    <button
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, className, isLoading }))}
      onClick={(event) => onClick && onClick(event)}
      type={type}
    >
      {/* {!isLoading && ( */}
      <Fragment>
        {isLoading && <LoaderCircle className="size-5 animate-spin" />}
        {icon && iconPlacement === 'start' && icon}
        <span>{children}</span>
        {icon && iconPlacement === 'end' && icon}
      </Fragment>
      {/* )} */}
    </button>
  );
};

export default Button;
