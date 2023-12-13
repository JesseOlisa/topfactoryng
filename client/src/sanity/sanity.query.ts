import { orderDocType, productType, searchResult } from '@/lib/definitions';
import { groq } from 'next-sanity';
import { client } from './sanity.client';

export const fetchRecentProducts = async () => {
  // console.log('Fetching revenue data...');
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const products = await client.fetch(
    groq`*[_type == "product"] | order(_createdAt desc)[0...4]{
    name,
    baseprice,
    "product_image": image,
    "colors": category -> colors,
    "slug": slug.current,
    _id,
  }`,
    {},
    { cache: 'no-store' }
  );
  return products;
};

//fetch products by category
const ITEMS_PER_PAGE = 20;
export const fetchProductsByCategory = async (
  category: string,
  currentPage: number
) => {
  try {
    const pageIndex = currentPage - 1;

    let collection = `*[_type == "product" && category._ref in *[_type == "category" && title == "${category}"]._id] | order(_createdAt desc)`;
    let slice = `[($pageIndex * ${ITEMS_PER_PAGE})...($pageIndex + 1)*${ITEMS_PER_PAGE}]`;
    const products: productType[] = await client.fetch(
      groq`${collection}${slice} {
        name,
        baseprice,
        "product_image": image,
        "colors": category -> colors,
        "slug": slug.current,
        _id,
      }`,
      {
        pageIndex,
      },
      { cache: 'no-store' }
    );

    return products;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Failed to fetch products.');
  }
};

//pagination: fetch next products

export const fetchCategoryPages = async (category: string) => {
  let collection = `*[_type == "product" && category._ref in *[_type == "category" && title == "${category}"]._id] | order(_createdAt desc)`;

  const count: number = await client.fetch(
    groq`count(${collection})/${ITEMS_PER_PAGE}`,
    {},
    { cache: 'no-cache' }
  );
  const totalPages = Math.ceil(Number(count)); //rounded up figure
  return totalPages;
};

/*****************************************NAVBAR *************************************/
//fetch all categories for navbar
export const fetchCategories = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  try {
    const categories: { title: string }[] = await client.fetch(
      groq`*[_type == 'category'] | order(_createdAt asc) {
    title,
  }`
    );
    return categories;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Failed to fetch categories');
  }
};

//fetch category name for metadata
export const fetchCategoryByTitle = async (title: string) => {
  try {
    const category: { title: string } = await client.fetch(
      groq`*[_type == 'category' && title == '${title}'][0] {
    title,
  }`
    );
    return category;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Failed to fetch category');
  }
};

//fetch search results
export const fetchSearchResults = async (
  searchedTerm: string
): Promise<searchResult[] | undefined> => {
  try {
    const results: searchResult[] = await client.fetch(
      groq`*[_type == 'product' && name match "${searchedTerm}*"][0..4]{
        "product_image": image.asset -> url,
        name,
        baseprice,
        'slug': slug.current,
      }`
    );
    // console.log(results);
    return results;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Search Failed.');
  }
};

//fetch single product
export const fetchSingleProduct = async (slug: string) => {
  try {
    const product: productType = await client.fetch(
      groq`*[_type == 'product' && slug.current =='${slug}'][0] {
        name,
        baseprice,
        "product_image": image,
        "colors": category -> colors,
        "slug": slug.current,
        "category": category -> title,
        _id,
      }
      `,
      {},
      {
        cache: 'no-store',
      }
    );

    return product;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Failed to fetch product');
  }
};

//fetch orders by order id
export const fetchOrdersById = async (orderId: string) => {
  try {
    const order: orderDocType = await client.fetch(
      groq`*[_type == 'orders' && orderId == '${orderId}'][0]`,
      {},
      { cache: 'no-store' }
    );
    return order;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Failed to fetch product');
  }
};
