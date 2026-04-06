"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  customBadgeActive,
} from "./custom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  status: "pending" | "active" | "inactive";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    size: 200,
    minSize: 120,
    maxSize: 300,
    header: "Name",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const avatar = row.original.avatar;
      return (
        <div className="flex items-center gap-4">
          <Avatar className="cursor-pointer">
            <AvatarImage src={avatar} alt="@shadcn" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <span>{name || <></>}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    size: 300,
    minSize: 150,
    maxSize: 400,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: (data) => <div className="text-left">Status</div>,
    size: 120,
    minSize: 80,
    maxSize: 200,
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return <div className="text-left">{customBadgeActive(status)}</div>;
    },
  },
  {
    accessorKey: "role",
    header: (data) => <div className="text-left">Role</div>,
    size: 120,
    minSize: 80,
    maxSize: 200,
    cell: ({ row }) => {
      const role: string = row.getValue("role");

      return <div className="text-left">admin</div>;
    },
  },
  {
    id: "actions",
    size: 80,
    minSize: 60,
    maxSize: 120,
    header: (data) => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
