import { Fragment } from 'react/jsx-runtime';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Ellipsis } from 'lucide-react';

interface IProps {
  label?: string;
  items: {
    title?: string;
    onSelect?: () => void;
    separator?: boolean;
  }[];
}

const Menu = ({ label, items }: IProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-0 outline-offset-0">
        <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 rounded-lg border border-zinc-200 bg-white p-1 shadow"
      >
        {label && (
          <Fragment>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </Fragment>
        )}
        {items.map((item, idx) => {
          return (
            <Fragment key={idx}>
              {item.separator && <DropdownMenuSeparator className="bg-zinc-200" />}
              {!item.separator && (
                <DropdownMenuItem
                  onClick={item.onSelect}
                  className="cursor-pointer px-2 py-2 text-sm focus:!bg-zinc-100"
                  key={idx}
                >
                  {item.title}
                </DropdownMenuItem>
              )}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
