<script lang="ts">
	import { Toggle } from '$lib/index.js';

	let { leftLabel, rightLabel }: { leftLabel?: string; rightLabel?: string } = $props();

	let theme = $state(false);

	$effect(() => {
		document.body.dataset.theme = theme ? 'dark' : 'light';
	});
</script>

<Toggle variant="primary" bind:checked={theme} leftIcon="ph:sun-bold" rightIcon="ph:moon-bold">
	{#snippet leftLabel()}
		<p>{leftLabel}</p>
	{/snippet}
	{#snippet rightLabel()}
		<p>{rightLabel}</p>
	{/snippet}
</Toggle>
