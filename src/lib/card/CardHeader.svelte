<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children
	}: {
        children: Snippet;
	} = $props();
</script>

<div class={cn('flex flex-col space-y-1.5 pb-4')}>
	{@render children()}
</div>
