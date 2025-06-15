"use client";

import React, { useState, useEffect } from "react";

import { Search, Filter } from "lucide-react";

import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { ProductFilter, SidebarFiltersProps } from "packages/shared/types/domain";
import { useDebounce } from "../lib/hooks/useDebounce";


export function SidebarFilters({
  categories,
  departments,
  onFilter,
  isMobileView
}: SidebarFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [department, setDepartment] = useState("all");
  const [source, setSource] = useState<"BR" | "EU" | "all">("all");
  const [onSale, setOnSale] = useState<"all" | "yes">("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const newFilter: ProductFilter = {
      category: category !== "all" ? category : undefined,
      department: department !== "all" ? department : undefined,
      source: source !== "all" ? (source as "BR" | "EU") : undefined,
      hasDiscount: onSale === "yes" ? true : undefined,
      priceMin: priceMin ? parseFloat(priceMin) / 100 : undefined,
      priceMax: priceMax ? parseFloat(priceMax) / 100 : undefined,
      searchTerm: debouncedSearchTerm || undefined,
    };
    onFilter(newFilter);
  }, [
    category,
    department,
    source,
    onSale,
    priceMin,
    priceMax,
    debouncedSearchTerm,
    onFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setDepartment("all");
    setSource("all");
    setOnSale("all");
    setPriceMin("");
    setPriceMax("");
  };

  // Converte o valor bruto (em centavos) para uma string de moeda formatada
  const formatCurrency = (rawValue: string) => {
    if (!rawValue) return "";
    const numberValue = parseFloat(rawValue) / 100;
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
    }).format(numberValue);
  };

  // Lida com a mudança no input, mantendo apenas dígitos no estado
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = e.target;
    const rawValue = value.replace(/\D/g, ""); // Mantém apenas dígitos
    setter(rawValue);
  };

  const FiltersContent = (
    <div className="p-4 space-y-6">
      {!isMobileView && <h3 className="text-lg font-semibold">Filtros</h3>}

      {/* Barra de Pesquisa */}
      <div>
        <label htmlFor="search-input" className="sr-only">
          Pesquisar produto
        </label>
        <div className="relative">
          <Input
            id="search-input"
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Filtros Select... (mantidos como antes) */}
      <div>
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Categoria
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue id="category-select" placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((cat: string) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor="department-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Departamento
        </label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-full">
            <SelectValue id="department-select" placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {departments.map((dept: string) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor="source-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Origem
        </label>
        <Select
          value={source}
          onValueChange={(v) => setSource(v as "BR" | "EU" | "all")}
        >
          <SelectTrigger className="w-full">
            <SelectValue id="source-select" placeholder="Todas as origens" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="BR">Fornecedor BR</SelectItem>
            <SelectItem value="EU">Fornecedor EU</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor="onsale-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Ofertas
        </label>
        <Select
          value={onSale}
          onValueChange={(v) => setOnSale(v as "all" | "yes")}
        >
          <SelectTrigger className="w-full">
            <SelectValue id="onsale-select" placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="yes">Apenas em promoção</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filtro por Preço */}
      <div>
        <h4 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preço
        </h4>
        <div className="flex gap-0.5 items-center">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
              R$
            </span>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="Mín"
              value={formatCurrency(priceMin)}
              onChange={(e) => handlePriceChange(e, setPriceMin)}
              className="pl-9"
            />
          </div>
          -
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
              R$
            </span>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="Máx"
              value={formatCurrency(priceMax)}
              onChange={(e) => handlePriceChange(e, setPriceMax)}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobileView) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Filter className="h-5 w-5" />
            <span className="sr-only">Abrir filtros</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Filtros de Produtos</DrawerTitle>
          </DrawerHeader>
          {FiltersContent}
          <DrawerFooter className="pt-2">
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Limpar Filtros
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="hidden md:block w-64 p-4 space-y-6 border-r bg-white dark:bg-background">
      {FiltersContent}
      <div className="pt-4 border-t">
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}
