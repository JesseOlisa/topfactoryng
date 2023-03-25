import React from 'react';
import Link from 'next/link';
import { uuid } from '@sanity/uuid';
import { contactType, orderDocType } from '@/interfaces';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePaystackPayment } from 'react-paystack';
import { useStateContext } from '@/context/StateContext';

type configType = {
	reference: string;
	email: string;
	amount: number;
	publicKey: string;
};

const Contact = () => {
	const { reference, confirmOrder, totalPrice, cartItems } = useStateContext();
	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
	} = useForm<contactType>();

	// PAYMENT config
	const config: configType = {
		reference,
		email: watch('email'),
		amount: totalPrice * 100,
		publicKey: 'pk_test_f424158e7a27f86ee778069f3ce1707cdaf67ac1',
	};

	const initializePayment = usePaystackPayment(config);

	const onSubmit: SubmitHandler<contactType> = (data: contactType) => {
		let orderedProduct = cartItems.map((item) => {
			item._key = uuid();
			return item;
		});
		const doc: orderDocType = {
			_type: 'orders',
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phoneNumber.toString(),
			address: data.address,
			orderId: reference,
			items: orderedProduct,
			totalPrice,
		};

		initializePayment(() => confirmOrder(doc));
	};

	return (
		<div className='flex-center -mt-3 h-screen flex-col bg-gray-50'>
			<p className='mb-2 text-center text-xl font-extrabold'>TopFactoryng</p>
			<h3 className='mb-6 text-center text-sm text-gray-700'>
				Please fill in your waybill information
			</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='form-container mx-auto w-[90%] flex-col rounded-lg bg-white p-3 py-4 shadow-md md:w-1/3'
			>
				<label htmlFor='firstName'>
					<p>First Name:</p>
					<input
						autoComplete='off'
						{...register('firstName', { required: true })}
					/>
					<p className='error-message'>
						{errors.firstName && 'first Name is required'}
					</p>
				</label>
				<label htmlFor='lastName'>
					<p>Last Name:</p>
					<input
						autoComplete='off'
						{...register('lastName', { required: true })}
					/>
					<p className='error-message'>
						{errors.lastName && 'Last Name is required'}
					</p>
				</label>
				<label htmlFor='email'>
					<p>Email:</p>
					<input
						autoComplete='off'
						{...register('email', { required: true })}
						placeholder='example@mail.com'
					/>
					<p className='error-message'>{errors.email && 'Email is required'}</p>
				</label>
				<label htmlFor='address'>
					<p>Waybill Address / bustop</p>
					<input
						autoComplete='off'
						{...register('address', { required: true })}
						placeholder='Address/Bustop, City, State'
					/>
					<p className='error-message'>
						{errors.address && 'Address is empty'}
					</p>
				</label>
				<label htmlFor='phoneNumber'>
					<p>Phone Number:</p>
					<input
						type='tel'
						pattern='[0-9]{11}'
						maxLength={11}
						placeholder='e.g 080xxxxxxxx'
						autoComplete='off'
						{...register('phoneNumber', {
							required: true,
						})}
					/>
					<p className='error-message'>
						{errors.phoneNumber &&
							errors.phoneNumber.type == 'required' &&
							'Please enter your phone number'}
					</p>
				</label>
				<button
					type='submit'
					className='btn-primary my-2 w-full'
				>
					Checkout
				</button>
			</form>

			<Link
				href='/'
				className='my-2 text-sm text-gray-600 underline hover:text-black'
			>
				Cancel Order
			</Link>
		</div>
	);
};

export default Contact;
