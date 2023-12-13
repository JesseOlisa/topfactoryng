import { fetchRecentProducts } from '@/sanity/sanity.query';
import ProductList from './product-list';
import { productType } from '@/lib/definitions';

const RecentProducts = async () => {
  const products: productType[] = await fetchRecentProducts();

  return (
    <ProductList
      products={products}
      className='w-full'
    />
  );
};

export default RecentProducts;
