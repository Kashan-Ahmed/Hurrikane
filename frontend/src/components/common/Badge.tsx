import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const COLOR_STRS = {
  success: 'border-transparent bg-[#ECFDF3] text-[#299C46]',
  error: 'border-transparent bg-[#CB121D]/15 text-[#CB121D]',
  primary: 'border-transparent bg-[#EFF8FF] text-[#146DD5]',
  warn: 'border-transparent bg-[#F7FEE7] text-[#008236]',
};

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-[14px] py-[3px] text-xs font-medium transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 capitalize',
  {
    variants: {
      variant: {
        default:
          'border-primary h-[22px] bg-gray-1/10 text-gray-1 hover:bg-gray-1/10 cursor-pointer',
        Active: COLOR_STRS.success,
        'In Active': COLOR_STRS.warn,
        Maintenance: COLOR_STRS.error,
        Available: COLOR_STRS.primary,
        approved: COLOR_STRS.primary,
        pending: COLOR_STRS.warn,
        rejected: COLOR_STRS.error,
        in_review: COLOR_STRS.warn,
        cancelled: COLOR_STRS.error,
        published: COLOR_STRS.success,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
type TProps = {
  label: string;
  className?: string;
  variant?: BadgeVariant;
};

const Badge = ({ variant = 'default', className, label }: TProps) => {
  return <div className={cn(badgeVariants({ variant }), className)}>{label}</div>;
};

export default Badge;
