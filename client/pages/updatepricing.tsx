import { client } from '@/lib/client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface PricingUpdateType {
	oldPrice: string;
	newPrice: string;
}

interface queryType {
	_id: string;
	baseprice: number;
}

const Updatepricing = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<PricingUpdateType>();

	const onSubmit: SubmitHandler<PricingUpdateType> = async (
		data: PricingUpdateType
	) => {
		let oldPrice = Number(data.oldPrice);
		let newPrice = Number(data.newPrice);
		try {
			const query = `*[_type == 'product' && baseprice == ${oldPrice} && dateTime(_updatedAt) < dateTime(now()) - 60*60*24*7]{
            _id,
            baseprice,
        }`;
			const fetchdocument = await client.fetch(query);
			const newprices = fetchdocument.map((item: queryType) => {
				return {
					...item,
					baseprice: newPrice,
				};
			});

			await Promise.all(
				newprices.map((doc: queryType) =>
					client.patch(doc._id).set({ baseprice: doc.baseprice }).commit()
				)
			);
			toast.success('Price were updated successfully');
			reset(data);
		} catch (error) {
			toast.error('There was an error , please try again');
		}
	};
	return (
		<div className='flex-center h-screen w-full bg-gray-50'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='form-container mx-auto w-[90%] flex-col rounded-lg bg-white p-3 py-4 shadow-md md:w-1/3'
			>
				<label htmlFor='Old Price'>
					<p>Old Price:</p>
					<input
						type='tel'
						placeholder='Enter old Price'
						autoComplete='off'
						{...register('oldPrice', {
							required: true,
						})}
						onChange={(e) =>
							setValue('oldPrice', e.target.value.replaceAll(/\D/g, ''))
						}
					/>
					<p className='error-message'>
						{errors.oldPrice &&
							errors.oldPrice.type == 'required' &&
							'Please enter a number'}
					</p>
				</label>
				<label htmlFor='New Price'>
					<p>New Price:</p>
					<input
						type='tel'
						placeholder='Enter New Price'
						autoComplete='off'
						{...register('newPrice', {
							required: true,
						})}
						onChange={(e) =>
							setValue('newPrice', e.target.value.replaceAll(/\D/g, ''))
						}
					/>
					<p className='error-message'>
						{errors.newPrice &&
							errors.newPrice.type == 'required' &&
							'Please enter a number'}
					</p>
				</label>
				<button
					type='submit'
					className='btn-primary my-2 w-full'
				>
					Checkout
				</button>
			</form>
		</div>
	);
};

export default Updatepricing;
