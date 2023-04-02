import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type searchType = {
	search: string;
};
const OrderHomePage = () => {
	const router = useRouter();
	const { handleSubmit, register } = useForm<searchType>();

	const onSubmit: SubmitHandler<searchType> = (data) => {
		router.push(`/orders/${data.search}`);
	};
	return (
		<>
			<div className='flex-center h-screen w-full bg-gray-50 text-center'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor='search'>
						<p className='mb-2 text-lg font-semibold'>Search for orders</p>
						<input
							autoComplete='off'
							{...register('search', { required: true })}
							placeholder='Enter reference Number'
							className='px-3 py-1 text-left outline-none'
						/>
						<button className='btn-red mx-auto mt-2 block text-sm'>
							Search
						</button>
					</label>
				</form>
			</div>
		</>
	);
};

export default OrderHomePage;
