import { Book, Prisma } from "@prisma/client";
import { BooksResponse, ISearch } from "../../types";
import calculatePagination, { IOptions } from "../../utils/pagination";
import prisma from "../../utils/prismaDB";

const createSingleBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  options: IOptions,
  search: ISearch
): Promise<BooksResponse> => {
  const { page, size, skip } = calculatePagination(options);

  const { searchTerm, minPrice, maxPrice, ...filterData } = search;

  const total = await prisma.book.count();

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ["title", "author", "genre", "publicationDate"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (maxPrice !== null) {
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  } else if (minPrice !== null) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  } else if (minPrice !== null && maxPrice !== null) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    skip,
    take: size,
    where: whereConditions,

    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });

  return {
    meta: {
      page: page,
      size: size,
      total,
    },
    data: result,
  };
};

const getBooksByCategory = async (categoryId: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const isExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found 🦀");
  }

  const result = prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found 🦀");
  }

  const result = prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleBook = async (id: string): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new Error("Resource Not Found 🦀");
  }

  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookServices = {
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  createSingleBook,
  getBooksByCategory,
};
