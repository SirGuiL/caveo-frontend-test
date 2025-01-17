import { Frown, LoaderCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  categories: string[];
  isLoading: boolean;
  isError: boolean;
  onPressLink: () => void;
}

const CategoriesList = ({
  categories,
  isLoading,
  isError,
  onPressLink,
}: Props) => {
  if (isLoading)
    return (
      <div className="flex justify-center pt-4 w-full">
        <div className="animate-spin">
          <LoaderCircle />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center gap-1 pt-1 w-full">
        <Frown />

        <p className="text-xs text-center">
          Tivemos um erro ao carregar as categorias
        </p>
      </div>
    );

  return (
    <div className="flex flex-col pl-1 gap-1">
      {categories.map((category) => (
        <Link
          href={`/category/${category}`}
          className="flex justify-start whitespace-nowrap hover:text-blue-400 transition-colors duration-300"
          key={category}
          onClick={onPressLink}
        >
          <span className="text-2xl md:text-sm">- {category}</span>
        </Link>
      ))}
    </div>
  );
};

export { CategoriesList };
