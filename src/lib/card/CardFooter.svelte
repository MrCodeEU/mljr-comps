<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>

<div
	class={cn(
		'flex flex-row items-center justify-between pt-4 text-sm text-gray-600 dark:text-gray-400'
	)}
>
	{@render children?.()}
</div>
