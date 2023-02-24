import { getProgressivelyData } from '@progressively/server-side';

export async function load({ cookies }) {
	const id = cookies.get('progressively-id');

	const { data, userId } = await getProgressivelyData('valid-sdk-key', {
		websocketUrl: 'ws://localhost:4000',
		apiUrl: 'http://localhost:4000',
		fields: {
			id
		}
	});

	cookies.set('progressively-id', userId);

	return data;
}
