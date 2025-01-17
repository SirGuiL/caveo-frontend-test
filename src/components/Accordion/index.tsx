"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { fetchCategories } from "@/domain/service/categoryService";

import { useProductStore } from "@/providers/productStoreProvider";

import { CategoriesList } from "@/components/CategoriesList";

interface AccordionProps {
  onPressLink: () => void;
}

const Accordion = ({ onPressLink }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const { isLoading, isError, refetch } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: false,
  });

  const setCategories = useProductStore((state) => state.setCategories);
  const categories = useProductStore((state) => state.categories);

  const handleOpenCategories = async () => {
    setOpen(!open);

    if (categories.length === 0) {
      getCategories();
    }
  };

  const getCategories = async () => {
    const result = await refetch();

    if (result.isSuccess && result.data) {
      setCategories(result.data);
    }
  };

  return (
    <div className="w-full">
      <button
        className="cursor-pointer flex justify-start items-center gap-2 group"
        onClick={() => handleOpenCategories()}
      >
        <label
          htmlFor="expandCollapse"
          className={`cursor-pointer text-gray-200 text-3xl font-medium md:text-base md:font-normal leading-none group-hover:text-blue-400 transition-colors duration-300`}
        >
          Categorias
        </label>

        <ChevronDown className="text-gray-200 group-hover:text-blue-400 transition-colors duration-300 w-8 h-8 md:w-5 md:h-5 stroke-3 md:stroke-2" />
      </button>

      <div
        className={`text-gray-200 inline-block h-fit w-full pt-3 md:pt-1 ${
          open ? "block" : "hidden"
        }`}
      >
        <CategoriesList
          categories={categories}
          isLoading={isLoading}
          isError={isError}
          onPressLink={onPressLink}
        />
      </div>
    </div>
  );
};

export { Accordion };
