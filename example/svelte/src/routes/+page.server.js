import { Progressively } from '@progressively/server-side';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const id = cookies.get('progressively-id');
	const sdk = Progressively.init({
		secretKey: 'secret-key',
		clientKey: 'valid-sdk-key',
		websocketUrl: 'ws://localhost:4000',
		apiUrl: 'http://localhost:4000',
		fields: {
			id
		}
	});

	const { data, userId } = await sdk.loadFlags();

	cookies.set('progressively-id', userId);

	return data;
}
