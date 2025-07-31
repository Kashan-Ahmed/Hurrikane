import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
type SectionCardVariant =
  | 'default'
  | 'danger'
  | 'info' // example third variant
  | 'warning';

interface SectionCardProps {
  totalRoutes?: number;
  percentage?: number;
  title?: string;
  variant?: SectionCardVariant;
}

import { ArrowDown, ArrowUp, RouteIcon } from 'lucide-react';
const SectionCard: React.FC<SectionCardProps> = ({
  totalRoutes = 120,
  percentage = 0,
  title = 'Total Routes',
  variant = 'default',
}) => {
  const TrendIcon = percentage > 1 ? ArrowUp : ArrowDown;
  const trendColor =
    variant === 'default'
      ? 'text-black'
      : variant === 'info'
        ? 'text-teal-700'
        : variant === 'danger'
          ? 'text-red-500'
          : 'text-blue-500';

  return (
    <Card className="min-w-[200px] flex-1 space-y-1 rounded-xl border-2 border-gray-200 p-3">
      <CardHeader className="p-0 pb-1 text-sm font-normal text-gray-500">{title}</CardHeader>
      <CardContent className="flex items-center justify-between p-0">
        <h3 className={`text-2xl font-bold leading-tight ${trendColor}`}>{totalRoutes}</h3>
        <span className="rounded-full bg-slate-100 p-2">
          <RouteIcon className={`${trendColor} h-4 w-4`} />
        </span>
      </CardContent>
      <CardFooter className="m-0 flex items-center p-0 pt-1 text-gray-400">
        {percentage != 0 && (
          <>
            <span
              className={`${
                percentage > 0 ? 'text-teal-700' : 'text-red-600'
              } mr-1 flex items-center text-sm font-medium leading-none`}
            >
              <TrendIcon className={`h-4 w-4`} />
              {percentage}%
            </span>
            <span className="text-sm font-medium">vs Last period</span>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default SectionCard;
