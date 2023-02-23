import { getProgressivelyData } from '@progressively/server-side';

export async function load({ cookies }) {
	const userId = cookies.get('progressively-id');

	const { data, response } = await getProgressivelyData('valid-sdk-key', {
		websocketUrl: 'ws://localhost:4000',
		apiUrl: 'http://localhost:4000',
		fields: {
			id: userId === 'undefined' ? undefined : userId
		}
	});

	cookies.set('progressively-id', response?.headers?.get('X-progressively-id'));

	return data;
}
