import React from 'react';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';
import { BsBagCheckFill } from 'react-icons/bs';

const Success = () => {
	const { orderId } = useStateContext();
	// console.log(typeof orderId);
	return (
		<div className='flex-center h-screen w-full flex-col gap-4'>
			<div className='relative w-4/5 flex-col rounded-lg bg-white py-8 px-5 text-center text-sm text-black shadow-md md:w-1/2'>
				<div className='mb-4'>
					<BsBagCheckFill
						size={49}
						className='mx-auto'
					/>
				</div>
				<h1 className='mb-4 md:text-3xl'>Thank you for your Order</h1>
				<p className='mb-1'>Your Payment was successful</p>
				<p className='mb-1'>A receipt has been sent to your mail</p>
				<p className='mb-1'>Estimated Delivery: 7 - 14 working days</p>
			</div>

			<div className='flex flex-col gap-1'>
				<Link
					href={`/orders/${orderId}`}
					className='mb-2'
					target='_blank'
				>
					<button className='btn-primary w-48'>View Receipt</button>
				</Link>
				<Link href={`/`}>
					<button className='btn-primary w-48'>Close</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
