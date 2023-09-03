import { Book } from "@prisma/client";

export interface ISearch {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface BooksResponse {
  meta: {
    page: number;
    size: number;
    total: number;
  };
  data: Book[];
}
