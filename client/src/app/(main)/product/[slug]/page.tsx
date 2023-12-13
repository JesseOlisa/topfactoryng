import ProductDetails from '@/components/product-details/product-details';
import { fetchSingleProduct } from '@/sanity/sanity.query';
import Image from 'next/image';
import { urlFor } from '@/sanity/sanity.client';

type Params = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: Params) {
  const { slug } = params;
  const product = await fetchSingleProduct(slug);
  return (
    <main className='page-container min-h-screen grid place-items-center w-full'>
      <section className='flex-center w-full max-w-[50rem] flex-col items-center gap-4 md:flex-row md:items-start py-3'>
        <div className='relative h-[21rem] w-full max-w-[21rem] md:h-[26rem] md:w-1/2 md:max-w-[20rem]'>
          <Image
            src={urlFor(product.product_image).url()}
            fill
            alt={`product image for ${product.name}`}
            className='rounded-xl object-cover md:h-full md:rounded-r-none'
            sizes='(min-width: 380px) 338px, calc(60vw + 120px)'
            priority
          />
        </div>
        <div className='flex min-h-[20rem] w-full max-w-[21rem] flex-col justify-between md:h-[26rem] md:w-[45%] md:max-w-none md:gap-4 md:px-0'>
          <ProductDetails product={product} />
        </div>
      </section>
    </main>
  );
}
