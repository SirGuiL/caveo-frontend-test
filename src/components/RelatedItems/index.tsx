import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchProductsByCategory } from "@/domain/service/productService";
import { product } from "@/domain/types/product";

import { ProductItem } from "@/components/ProductItem";

interface RelatedItemsProps {
  category: string;
  isLoading?: boolean;
}

const RelatedItems = ({
  category,
  isLoading: isLoadingParent,
}: RelatedItemsProps) => {
  const searchParams = useParams();
  const id = Number(searchParams.id);

  const { data, isLoading } = useQuery<product[]>({
    queryKey: ["productsByCategory", category],
    queryFn: () => fetchProductsByCategory(category),
  });

  if (isLoading || isLoadingParent)
    return (
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5].map(() => (
          <ProductItem
            key={Math.random()}
            category=""
            description=""
            id={Math.random()}
            image=""
            price={0}
            rating={{ count: 0, rate: 0 }}
            title=""
            isLoading
          />
        ))}
      </div>
    );

  return (
    <div className="flex flex-wrap gap-4">
      {data
        ?.filter((product) => product.id !== id)
        .map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
    </div>
  );
};

export { RelatedItems };
