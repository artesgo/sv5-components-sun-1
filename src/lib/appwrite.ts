import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6459ae9f53672478e9ee"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
const storage = new Storage(client);

export { Databases, client, storage };

// how to upload files to appwrite
// const promise = storage.createFile(
//     '[BUCKET_ID]',
//     ID.unique(),
//     document.getElementById('uploader').files[0]
// );

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });


// how to download files from appwrite
// const result = storage.getFileDownload('[BUCKET_ID]', '[FILE_ID]');
// console.log(result); // Resource URL