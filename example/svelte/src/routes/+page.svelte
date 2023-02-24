<script>
	import { onDestroy, onMount } from 'svelte';
	import { Progressively } from '@progressively/sdk-js';
	/** @type {import('./$types').PageServerData} */ export let data;

	let flags = data.initialFlags || {};

	/**
	 * @type {import('@progressively/sdk-js').ProgressivelySdkType}
	 */
	let sdk;

	onMount(() => {
		sdk = Progressively.init(data.clientKey, data);

		sdk.onFlagUpdate((nextFlags) => {
			flags = nextFlags;
		});
	});

	onDestroy(() => {
		sdk?.disconnect();
	});
</script>

<main>
	<div>
		<h1>New homepage</h1>
		{flags.newHomepage ? 'New variant' : 'Old variant'}
	</div>

	<footer>{flags.newFooter ? 'New footer' : 'Old footer'}</footer>
</main>
