import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import FakeImage from '@/public/assets/clothing.png';
import Image from 'next/image';
import { SearchResult } from '@/interfaces';
import { urlFor } from '@/lib/client';
import { useRouter } from 'next/router';

type searchInputType = {
	search: string;
};

interface SearchProps {
	setIsSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
	setSearchResult: React.Dispatch<React.SetStateAction<SearchResult | null>>;
	searchResult: SearchResult | null;
	searchText: string;
	handleChange: (value: string) => void;
}

const Search = ({
	setIsSearchOpen,
	setSearchText,
	searchText,
	handleChange,
	searchResult,
	setSearchResult,
}: SearchProps) => {
	const router = useRouter();

	//closes search
	const closeSearchResult = () => {
		setSearchText('');
		setSearchResult(null);
		if (setIsSearchOpen) {
			setIsSearchOpen(false);
		}
	};

	const onClickResult = (slug: string) => {
		router.push(`/product/${slug}`);
		closeSearchResult();
	};
	const { register } = useForm<searchInputType>();
	return (
		<>
			<div className='relative w-full md:block md:min-w-280'>
				<div className='flex items-center gap-x-5'>
					<div className='relative w-[90%] md:w-full'>
						<label htmlFor='search'>
							<input
								autoComplete='off'
								{...register('search')}
								onChange={(e) => handleChange(e.target.value)}
								placeholder='Search products'
								className='w-full border-neutral-400 py-2 pl-8 pr-3 text-sm md:rounded-lg md:border'
							/>
						</label>
						<div className='absolute top-[50%] left-2 -translate-y-1/2'>
							<FiSearch
								size={20}
								className='font-semibold text-neutral-600'
							/>
						</div>
					</div>
					<CgClose
						size={25}
						className='md:hidden'
						onClick={() => closeSearchResult()}
					/>
				</div>

				{/* results */}

				{searchText !== '' && searchResult !== null && (
					<ul className='absolute z-10 mt-4 w-full rounded-sm border bg-white shadow-sm md:min-w-280'>
						{searchResult && searchResult.length > 0 ? (
							searchResult.map((result, idx) => (
								<li
									key={idx}
									className='flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0 hover:bg-neutral-200'
									onClick={() => onClickResult(result.slug)}
								>
									<div className='relative h-10 w-10'>
										<Image
											src={urlFor(result.image).url()}
											alt='product'
											fill
											className='rounded-md object-cover'
										/>
									</div>
									<div className='flex flex-col items-end gap-y-1 text-sm'>
										<p>{result.name}</p>
										<p className='font-semibold'>&#x20A6;{result.baseprice}</p>
									</div>
								</li>
							))
						) : (
							<p className='py-5 text-center text-xs text-neutral-500'>
								No result for this product
							</p>
						)}
					</ul>
				)}
			</div>
		</>
	);
};

export default Search;
