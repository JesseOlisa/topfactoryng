// import toast from 'react-hot-toast';
// import { client } from './sanity.client';

// const fetchDocuments = () =>
//   client.fetch(
//     `*[_type == 'orders'].items[_key=="3783c3f6-fa45-4713-8ce4-f1b2e0769339"]{_id, _key, imageUrl}`
//   );

// // const buildPatches = (docs: any) =>
// //   docs.map((doc: any) => ({
// //     id: doc._id,
// //     patch: {
// //       set: { ['items[_key=="${}"]']: doc.name },
// //       unset: ['imageUrl'],
// //       // this will cause the transaction to fail if the documents has been
// //       // modified since it was fetched.
// //       ifRevisionID: doc._rev,
// //     },
// //   }));

// const createTransaction = (patches: any) =>
//   patches.reduce(
//     (tx: any, patch: any) => tx.patch(patch.id, patch.patch),
//     client.transaction()
//   );

// const commitTransaction = (tx: any) => tx.commit();

// // export const migrateNextBatch = async () => {
// //   const documents = await fetchDocuments();
// //   const patches = buildPatches(documents);
// //   if (patches.length === 0) {
// //     console.log('No more documents to migrate!');
// //     return null;
// //   }
// //   console.log(
// //     `Migrating batch:\n %s`,
// //     patches
// //       .map((patch: any) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
// //       .join('\n')
// //   );
// //   const transaction = createTransaction(patches);
// //   await commitTransaction(transaction);
// //   return migrateNextBatch();
// // };

// // migrateNextBatch().catch((err: any) => {
// //   console.error(err);
// //   process.exit(1);
// // });

// export const migrateNextBatch = async () => {
//   const orders = await fetchDocuments();
//   try {
//     console.log(orders);
//     // const newItems = orders.map((item: any) => {
//     //   return {
//     //     id: item._id,
//     //     product_image: item.imageUrl,
//     //   };
//     // });

//     // console.log(newItems);

//     // client
//     //   .patch('VJHKgWp2PbBoYftRgtBIkK')
//     //   .setIfMissing({
//     //     [`items.key=="ae413ba8-b453-4f00-b7ea-697d468910b3"`]: [],
//     //   })
//     //   .append('items[0]', [
//     //     { imageStrings: 'This is a string' },
//     //     { more: 'This is a string' },
//     //   ])
//     //   .commit({ autoGenerateArrayKeys: true });
//     await Promise.all(
//       orders.map((item: any) => {
//         client
//           .patch(item._key)
//           .setIfMissing({
//             [`items[_key==\"${item._key}\"].product_image`]: null,
//           })
//           .set({
//             [`items[_key==\"${item._key}\"].product_image`]: item.imageUrl,
//           })
//           .commit();
//       })
//     );
//     toast.success('Done');
//   } catch (error) {
//     console.error(error);
//   }
// };
