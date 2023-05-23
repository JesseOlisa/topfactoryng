export default {
  name: 'orders',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      readonly: true,
    },
    {
      name: 'lastName',
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
              type: 'string',
              name: 'imageUrl',
              title: 'imageUrl',
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
