"use client";
// import Image from "next/image";
// import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import * as React from "react";

import { useSearchParams } from "next/navigation";

export default function BuscarClientePage() {
  // const session = await auth();
  // if (!session) {
  //   redirect("/sistema");
  // }
  const search = useSearchParams();
  const searchQuery = search ? search.get("nombreCliente") : null;

  return (
    <>
      <div className="mx-auto grid  flex-1 auto-rows-max gap-4 w-full">
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-0-chunk-0">
              <CardHeader>
                <CardTitle>Resultados</CardTitle>
                <CardDescription>texto pendiente</CardDescription>
              </CardHeader>
              <CardContent>hola {searchQuery}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
