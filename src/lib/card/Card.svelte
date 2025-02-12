<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<div class={cn('clay p-5 flex flex-col text-black dark:text-white min-w-[300px]')}>
	{@render children()}
</div>
