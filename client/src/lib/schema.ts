import { client } from '@/sanity/sanity.client';
import toast from 'react-hot-toast';
import { z } from 'zod';

const phone_regex = new RegExp(/((^0)(7|8|9){1}(0|1){1}[0-9]{8})/);

const CheckoutSchema = z.object({
  id: z.string(),
  firstname: z
    .string({ required_error: 'Firstname is required' })
    .min(1, { message: 'Firstname is required' }),
  lastname: z
    .string({ required_error: 'Lastname is required' })
    .min(1, { message: 'Last name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  address: z
    .string({ required_error: 'Address is required' })
    .min(1, 'Address is required'),
  phone: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'This is number',
    })
    .regex(phone_regex, {
      message: 'Phone must match this format: 08012345678',
    }),
});

export const OrderSearchSchema = z
  .string({ required_error: 'This field is required' })
  .min(1, { message: 'This field is required' });

export type State = {
  errors?: {
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    address?: string[];
    phone?: string[];
  };
  message?: string | null;
};

export const CreateOrder = CheckoutSchema.omit({ id: true });

export const deleteDocument = async () => {
  client.delete('7P2aEuoKmJfZhfctFW934u').then(() => toast.success('done'));
};

export const updatePrice = async (data: any) => {
  let oldPrice = Number(data.oldPrice);
  let newPrice = Number(data.newPrice);
  try {
    const query = `*[_type == 'product' && category->title == 'rompers & jumpsuit' && dateTime(_updatedAt) < dateTime(now()) - 60*60*24]{
          _id,
          name,
          baseprice,
          _updatedAt,
      }`;
    const fetchdocument = await client.fetch(query);
    const newprices = fetchdocument.map((item: any) => {
      return {
        ...item,
        baseprice: item.baseprice + 400,
      };
    });
    console.log(newprices);

    // await Promise.all(
    //   newprices.map((doc: queryType) =>
    //     client.patch(doc._id).set({ baseprice: doc.baseprice }).commit()
    //   )
    // );
    toast.success('Price were updated successfully');
  } catch (error) {
    toast.error('There was an error , please try again');
  }
};

//query is below
//query to update with date and time.
// const query = `*[_type == 'product' &&  baseprice == ${oldPrice} && dateTime(_updatedAt) < dateTime(now()) - 60*60*24*7]{
//   _id,
//   baseprice,
// }`;
