"use client";
import * as React from "react";
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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { any } from "zod";
import ListadoClientesBuscador from "./listadoClientesBuscador";

export type Contrato = {
  terreno: string;
  id_contrato: number;
  estatus: string;
};

export type listadoClientes = {
  id_cliente: number;
  nombre_cliente: string;
  ap_paterno?: string;
  contratos?: Contrato[];
};

function isListadoClientesArray(value: any): value is listadoClientes[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item.hasOwnProperty("id_cliente") &&
        item.hasOwnProperty("nombreCliente")
    )
  );
}

export function Resultados() {
  const [searchResults, setSearchResults] = useState<listadoClientes[] | null>(
    null
  );
  const search = useSearchParams();
  const searchQuery = search ? search.get("nombreCliente") : null;
  // let resultadoClientes;

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`/api/buscarCliente?nombre=${searchQuery}`, {
        next: { revalidate: 0 },
        // cache: "no-store",
        cache: "no-cache",
      });
      const datos = await response.json();
      setSearchResults(datos);
      // resultadoClientes = datos;
    };

    if (searchQuery != null) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <>
      {/* {searchResults &&
      typeof searchResults === "object" &&
      Object.keys(searchResults).length > 0
        ? JSON.stringify(searchResults)
        : "No hay resultados"} */}
      <ListadoClientesBuscador data={searchResults || []} />

      {/* <ListadoClientesBuscador
        data={isListadoClientesArray(searchResults) ? searchResults : []}
      /> */}
    </>
  );
}
