import { ID, Query, type Models } from 'appwrite';
import { Databases, client } from '$lib/appwrite';

export const BLOG_DATABASE_ID = '6538893b63b2d7b690ef';
export const POSTS_COLLECTION_ID = '65388c222d3154e89494';

const databases = new Databases(client);

let store = $state<Models.Document[]>([]);

async function init() {
	const response = await databases.listDocuments(
		BLOG_DATABASE_ID,
		POSTS_COLLECTION_ID,
		// Use a query to how the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
	console.log('hello', response.documents);
	store = response.documents;
}

async function add(userId: string, title: string, description: string) {
	const response = await databases.createDocument(
		BLOG_DATABASE_ID,
		POSTS_COLLECTION_ID,
		ID.unique(),
		{
			userId,
			title,
			description
		}
	);
	store = [response, ...store];
}

async function remove(id: string) {
	await databases.deleteDocument(BLOG_DATABASE_ID, POSTS_COLLECTION_ID, id);
	store = store.filter((idea) => idea.$id !== id);
}

async function check(post: Models.Document) {
	await databases.updateDocument(BLOG_DATABASE_ID, POSTS_COLLECTION_ID, post.$id, {
		done: !post.done
	});
}

async function update(post: Models.Document, updatedTitle: string) {
	await databases.updateDocument(BLOG_DATABASE_ID, POSTS_COLLECTION_ID, post.$id, {
		title: updatedTitle
	});
}

export function blog() {
	return {
		data: store,
		init,
		add,
		remove,
		check,
		update
	};
}
