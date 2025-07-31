import React from 'react';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table';
import Button from './Button';
import { ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, LoaderCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  totalRecords: number;
  onPaginationChange: (pagination: PaginationState) => void;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  loading = false,
  pagination,
  totalRecords,
  onPaginationChange,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    rowCount: totalRecords,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater !== 'function') return;
      const nextState = updater(pagination);
      onPaginationChange(nextState);
    },
    state: {
      pagination,
    },
  });

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div>
      <div className="overflow-auto rounded-md border border-neutral-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className={cn('bg-primary [&_tr]:border-b')}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn(`h-8 cursor-default border-b text-xs text-white`)}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        `text-nowrap px-4 text-left align-middle font-normal [&:has([role=checkbox])]:pr-0`
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className={cn('[&_tr:last-child]:border-0')}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    `border-b border-b-zinc-200 text-sm transition-colors hover:bg-slate-100/30`
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'p-4 align-middle text-sm font-normal [&:has([role=checkbox])]:pr-0'
                      )}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <React.Fragment>
                <tr>
                  <td
                    colSpan={columns.length}
                    className={cn(
                      'p-4 align-middle [&:has([role=checkbox])]:pr-0',
                      'h-24 text-center text-sm'
                    )}
                  >
                    {loading ? (
                      <div className="flex justify-center">
                        <LoaderCircle className="size-5 animate-spin" />
                      </div>
                    ) : (
                      'No results.'
                    )}
                  </td>
                </tr>
              </React.Fragment>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-end md:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows Per Page</p>
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(val) =>
              onPaginationChange({
                pageSize: Number(val),
                pageIndex: 0,
              })
            }
          >
            <SelectTrigger className="h-8 w-[72px] border-zinc-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['5', '10', '20', '30', '40', '50'].map((item, idx) => {
                return (
                  <SelectItem key={idx} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="size-8 border-zinc-300"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} className="text-black" />
          </Button>
          <Button
            variant="outline"
            className="size-8 border-zinc-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} className="text-black" />
          </Button>

          <Button
            variant="outline"
            className="size-8 border-zinc-300"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} className="text-black" />
          </Button>
          <Button
            variant="outline"
            className="size-8 border-zinc-300"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} className="text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
