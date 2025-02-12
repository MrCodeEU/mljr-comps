<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>

<div class={cn('py-4 flex flex-col gap-4')}>
	{@render children?.()}
</div>
