"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Resultados() {
    const [searchResults, setSearchResults] = useState<string | null>(null);
const search = useSearchParams();
const searchQuery = search ? search.get("nombreCliente") : null;

useEffect(() => {
  const fetchSearchResults = async () => {
    const response = await fetch(`/api/buscarCliente?nombre=${searchQuery}`);
    const data = await response.json();
   console.log(data);
    setSearchResults(data);
  };

  if (searchQuery) {
    fetchSearchResults();
  }
}, [searchQuery]);
  return (
    <>
      {/*searchResults*/} 
      {/*searchResults && JSON.stringify(searchResults.mensaje)*/}
      {searchResults && typeof searchResults === 'object' && JSON.stringify(searchResults)}
    </>
  );
}