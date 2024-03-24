import { ID, type Models } from 'appwrite';
import { goto } from '$app/navigation';
import { account } from '../appwrite';

let store = $state<Models.Preferences | null>(null);

async function init() {
	try {
		store = await account.get();
		console.log('user', store);
	} catch (e) {
		store = null;
		console.log('nada', store);
	}
}

async function register(email: string, password: string) {
	await account.create(ID.unique(), email, password);
	await login(email, password);
}

async function login(email: string, password: string) {
	const session = await account.createEmailPasswordSession(email, password);
	console.log(session);
	await init();
	goto('/'); // Redirect to home page after login
}

async function logout() {
	await account.deleteSession('current');
	store = null;
}

async function refresh() {
	await account.getSession('current');
	store = null;
}

// Expose the store's value with $user
export function user() {
	return {
		data: store,
		session: refresh,
		register,
		login,
		logout,
		init
	};
}
