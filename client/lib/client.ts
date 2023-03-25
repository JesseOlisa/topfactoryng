import { createClient, type ClientConfig } from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config: ClientConfig = {
	projectId: 'c6h34xai',
	dataset: 'production',
	useCdn: false,
	apiVersion: '2023-03-09',
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export const client = createClient(config);

const builder = ImageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
