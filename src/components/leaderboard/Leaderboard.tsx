"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRow } from "../../data/models/TableTypes";

const data: UserRow[] = [
  { username: "jane_doe", elo: 1095, timestamp: "2024-05-09T19:45:38.462Z" },
  {
    username: "charlie_brown",
    elo: 1068,
    timestamp: "2024-05-09T19:45:38.604Z",
  },
  { username: "john_doe", elo: 1052, timestamp: "2024-05-09T19:45:38.571Z" },
  { username: "bob_smith", elo: 1040, timestamp: "2024-05-09T19:45:38.588Z" },
  {
    username: "alice_wonderland",
    elo: 1029,
    timestamp: "2024-05-09T19:45:38.568Z",
  },
  { username: "jane_doe", elo: 1095, timestamp: "2024-05-09T19:45:38.462Z" },
  {
    username: "charlie_brown",
    elo: 1068,
    timestamp: "2024-05-09T19:45:38.604Z",
  },
  { username: "john_doe", elo: 1052, timestamp: "2024-05-09T19:45:38.571Z" },
  { username: "bob_smith", elo: 1040, timestamp: "2024-05-09T19:45:38.588Z" },
  {
    username: "alice_wonderland",
    elo: 1029,
    timestamp: "2024-05-09T19:45:38.568Z",
  },{ username: "jane_doe", elo: 1095, timestamp: "2024-05-09T19:45:38.462Z" },
  {
    username: "charlie_brown",
    elo: 1068,
    timestamp: "2024-05-09T19:45:38.604Z",
  },
  { username: "john_doe", elo: 1052, timestamp: "2024-05-09T19:45:38.571Z" },
  { username: "bob_smith", elo: 1040, timestamp: "2024-05-09T19:45:38.588Z" },
  {
    username: "alice_wonderland",
    elo: 1029,
    timestamp: "2024-05-09T19:45:38.568Z",
  },{ username: "jane_doe", elo: 1095, timestamp: "2024-05-09T19:45:38.462Z" },
  {
    username: "charlie_brown",
    elo: 1068,
    timestamp: "2024-05-09T19:45:38.604Z",
  },
  { username: "john_doe", elo: 1052, timestamp: "2024-05-09T19:45:38.571Z" },
  { username: "bob_smith", elo: 1040, timestamp: "2024-05-09T19:45:38.588Z" },
  {
    username: "alice_wonderland",
    elo: 1029,
    timestamp: "2024-05-09T19:45:38.568Z",
  },{ username: "jane_doe", elo: 1095, timestamp: "2024-05-09T19:45:38.462Z" },
  {
    username: "charlie_brown",
    elo: 1068,
    timestamp: "2024-05-09T19:45:38.604Z",
  },
  { username: "john_doe", elo: 1052, timestamp: "2024-05-09T19:45:38.571Z" },
  { username: "bob_smith", elo: 1040, timestamp: "2024-05-09T19:45:38.588Z" },
  {
    username: "alice_wonderland",
    elo: 1029,
    timestamp: "2024-05-09T19:45:38.568Z",
  },{ username: "jane_doe", elo: 1095, timestamp: "2024-05-09T19:45:38.462Z" },
  {
    username: "charlie_brown",
    elo: 1068,
    timestamp: "2024-05-09T19:45:38.604Z",
  },
  { username: "john_doe", elo: 1052, timestamp: "2024-05-09T19:45:38.571Z" },
  { username: "bob_smith", elo: 1040, timestamp: "2024-05-09T19:45:38.588Z" },
  {
    username: "alice_wonderland",
    elo: 1029,
    timestamp: "2024-05-09T19:45:38.568Z",
  },
];

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "rank",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "elo",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Elo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("elo")}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created (UTC)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("timestamp")}</div>;
    },
  },
];

export function Leaderboard({ data } : { data : UserRow[]}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter usernames..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.username}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.username}>
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
                <TableRow key={row.username}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.username}>
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
        <div className="flex-1 text-sm text-muted-foreground">
          Total of {table.getFilteredRowModel().rows.length} row(s)
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          Viewing {currentPage} of{" "} {table.getPageCount()} pages
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={ () => { table.previousPage(); setCurrentPage(currentPage - 1); } }
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { table.nextPage(); setCurrentPage(currentPage + 1); }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
