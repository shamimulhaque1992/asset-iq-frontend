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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

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
        <div className="relative w-full">
          <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
          <Input
            placeholder="Search assets..."
            value={
              (table.getColumn("category")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("category")?.setFilterValue(event.target.value)
            }
            className="pl-12 pr-3 text-md w-full border-2 border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-gray-500 placeholder:text-gray bg-white py-6"
          />
        </div>

        <div className="flex justify-between w-full space-x-2">
          <div className="flex justify-between gap-2">
            <Button className="border rounded-md px-4 py-2">Export</Button>
            <Button className="border rounded-md px-4 py-2">Audit</Button>
            <Button className="border rounded-md px-4 py-2">Print</Button>
          </div>
          <div className="flex justify-between gap-2">
            <Select
              value={String(table.getState().pagination.pageSize)} // Convert value to string
              onValueChange={(value) => {
                table.setPageSize(Number(value)); // Convert selected value back to number
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <DropdownMenuLabel>All Assets</DropdownMenuLabel>
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
            <Link href={"/assets/add-asset"}>
              <Button className="bg-primary-1 text-white rounded-md w-[100px] px-2 py-2 flex justify-around items-center">
                <TbSquareRoundedPlus></TbSquareRoundedPlus>
                <span>Add Asset</span>
              </Button>
            </Link>
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
          <MdKeyboardDoubleArrowLeft />
        </Button>

        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <MdKeyboardArrowLeft />
        </Button>

        {/* Page Number Buttons with Ellipsis */}
        {pageButtons.map((page, idx) =>
          typeof page === "number" ? (
            <Button
              key={idx}
              size="sm"
              onClick={() => table.setPageIndex(page)}
              className={`${
                currentPage === page
                  ? "bg-primary-1 text-white"
                  : "bg-secondary-3"
              } `}
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
          <MdKeyboardArrowRight />
        </Button>

        <Button
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <MdKeyboardDoubleArrowRight />
        </Button>
      </div>
    </div>
  );
}
