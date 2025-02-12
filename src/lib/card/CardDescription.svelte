<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>

<div class={cn('ps-1 flex flex-row text-sm text-gray-600 dark:text-gray-400')}>
	{@render children?.()}
</div>
