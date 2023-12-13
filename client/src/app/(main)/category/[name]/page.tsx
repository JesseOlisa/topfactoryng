import { Suspense } from 'react';
import { Metadata, ResolvedMetadata } from 'next';
import Pagination from '@/components/pagination';
import ProductList from '@/components/products/product-list';
import {
  fetchCategories,
  fetchCategoryByTitle,
  fetchCategoryPages,
  fetchProductsByCategory,
} from '@/sanity/sanity.query';

import { ProductListSkeleton } from '@/components/skeletons';

type Params = {
  params: {
    name: string;
  };
  searchParams: {
    page: string;
  };
};

// //GENERATE DYNAMIC METADATA
export async function generateMetadata(
  { params }: Params
  // parent: ResolvedMetadata
): Promise<Metadata> {
  const name = decodeURIComponent(params.name);
  const categories = await fetchCategoryByTitle(name);

  return {
    title: `Topfactoryng | ${categories?.title}`,
  };
}

//RETURN LIST OF PARAMS TO POPULATE THE CATEGORY SEGEMENT
export const generateStaticParams = async () => {
  const categories: { title: string }[] = await fetchCategories();

  return categories.map((category) => ({ name: category.title }));
};

const CategoryPage = async ({ params, searchParams }: Params) => {
  const categoryName = decodeURIComponent(params.name); //to decode the uri
  const currentPage = Number(searchParams?.page) || 1;

  const [products, totalPages] = await Promise.all([
    fetchProductsByCategory(categoryName, currentPage),
    fetchCategoryPages(categoryName),
  ]);

  // console.log(products);

  //If no product in section return this
  if (products?.length === 0) {
    return (
      <main className='flex-center h-screen'>
        <h2 className='font-light text-lg'>Coming soon...</h2>
      </main>
    );
  }

  return (
    <main className='page-container'>
      <Suspense
        key={categoryName + currentPage}
        fallback={<ProductListSkeleton length={8} />}
      >
        <ProductList products={products} />
      </Suspense>
      <div className='w-full mt-5 mb-7 flex justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
};

export default CategoryPage;
