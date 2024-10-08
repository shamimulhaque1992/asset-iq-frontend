"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generatePageButtons } from "@/helpers/paginationButtons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageWindowStart, setPageWindowStart] = useState(0);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const pageButtons = generatePageButtons(pageCount, currentPage, 7);
  return (
    <div className="">
      <div className="flex flex-col items-center py-4 gap-3">
        <Input
          placeholder="Search assets..."
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("category")?.setFilterValue(event.target.value)
          }
          className="border-0 shadow-md "
        />
        <div className="flex justify-between w-full space-x-2">
          <div className="flex justify-between gap-2">
            <Button className="border rounded-md px-4 py-2">Export</Button>
            <Button className="border rounded-md px-4 py-2">Audit</Button>
            <Button className="border rounded-md px-4 py-2">Print</Button>
          </div>
          <div className="flex justify-between gap-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="border rounded-md px-4 py-2">
                  All Assets
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-0 shadow-md"
              >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                // onClick={() => navigator.clipboard.writeText(payment.assetId)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-green-500 text-white rounded-md px-4 py-2">
              Add Asset
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border-gray_theme shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* First Page Button */}
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>

        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>

        {/* Page Number Buttons with Ellipsis */}
        {pageButtons.map((page, idx) =>
          typeof page === "number" ? (
            <Button
              key={idx}
              size="sm"
              onClick={() => table.setPageIndex(page)}
              variant={currentPage === page ? "secondary" : "default"}
            >
              {page + 1}
            </Button>
          ) : (
            <span key={idx} className="px-2">
              {page}
            </span>
          )
        )}

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>

        <Button
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>

        {/* Previous/Next Page Window Buttons */}
        {/* {pageWindowStart > 0 && (
          <Button onClick={handlePreviousPageWindow}>{"< Prev"}</Button>
        )}
        {pageWindowStart + pageWindowSize < totalPageCount && (
          <Button onClick={handleNextPageWindow}>{"Next >"}</Button>
        )} */}
      </div>
    </div>
  );
}
