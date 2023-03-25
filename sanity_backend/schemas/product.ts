export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
            },
            {
              type: 'string',
              name: 'colorCode',
              title: 'Color code',
            },
          ],
        },
      ],
    },
    {
      name: 'baseprice',
      title: 'Base Price',
      type: 'number',
    },
  ],
}
