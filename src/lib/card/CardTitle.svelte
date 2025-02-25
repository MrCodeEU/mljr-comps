<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children,
		class: className = ''
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('flex flex-row text-2xl font-bold', className)}>
	{@render children?.()}
</div>
