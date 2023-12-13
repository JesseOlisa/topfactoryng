export default {
  name: 'orders',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'firstname',
      title: 'First Name',
      type: 'string',
      readonly: true,
    },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
      readonly: true,
    },
    {
      name: 'orderId',
      title: 'Order Id',
      type: 'string',
      readonly: true,
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      readonly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      readonly: true,
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      readonly: true,
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'Products',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'name',
            },
            {
              type: 'image',
              name: 'product_image',
              title: 'Product image',
            },
            {
              type: 'number',
              name: 'size',
              title: 'size',
            },
            {
              name: 'color',
              title: 'color',
              type: 'string',
            },
            {
              type: 'number',
              name: 'quantity',
              title: 'Quantity',
            },
            {
              type: 'number',
              name: 'price',
              title: 'Price',
            },
          ],
        },
      ],
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      readonly: true,
    },
  ],
}
