import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type TProps = {
  label: string;
  className?: string;
  variant?:
    | 'active'
    | 'inactive'
    | 'closed'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'default'
    | 'Pass'
    | 'Fail'
    | 'completed'
};

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 capitalize',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gray-1/10 text-gray-1 hover:bg-gray-1/10 cursor-pointer',
        active:
          'border-transparent bg-[#ECFDF3] text-[#299C46] hover:bg-[#ECFDF3] hovertext-[#299C46]',
        Pass: 'border-transparent bg-[#ECFDF3] text-[#299C46] hover:bg-[#ECFDF3] hover:text-[#299C46]',
        closed:
          'border-transparent bg-[#FDEBEB] text-[#CB121D] hover:bg-[#FDEBEB] hover:text-[#CB121D]',
        pending:
          'border-transparent bg-[#FFF4CB] text-[#A5600D] hover:bg-[#FFF4CB] hover:text-[#A5600D]',
        inactive:
          'border-transparent bg-[#FFF4CB] text-[#A5600D] hover:bg-[#FFF4CB] hover:text-[#A5600D]',
        approved:
          'border-transparent bg-[#ECFDF3] text-[#299C46] hover:bg-[#ECFDF3] hover:text-[#299C46]',
        rejected:
          'border-transparent bg-[#FDEBEB] text-[#CB121D] hover:bg-[#FDEBEB] hover:text-[#CB121D]',
        Fail: 'border-transparent bg-[#FDEBEB] text-[#CB121D] hover:bg-[#FDEBEB] hover:text-[#CB121D]',
        completed:
          'border-transparent bg-[#ECFDF3] text-[#299C46] hover:bg-[#ECFDF3] hovertext-[#299C46]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const StatusChip = ({ variant = 'default', className, label }: TProps) => {
  return <div className={cn(badgeVariants({ variant }), className)}>{label}</div>;
};

export default StatusChip;
