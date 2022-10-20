export interface ResortProps {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export type FilterResortsProps = {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type SortTypeResortsType = 'title' | 'price';
