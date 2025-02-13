<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children,
		class: className = '',
	}: {
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('clay p-5 flex flex-col text-black dark:text-white min-w-[300px]', className)}>
	{@render children()}
</div>
