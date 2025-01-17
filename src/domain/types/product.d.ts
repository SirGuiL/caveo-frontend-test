export type product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: rating;
};

export type cartProduct = product & { quantity: number };

type rating = {
  rate: number;
  count: number;
};
