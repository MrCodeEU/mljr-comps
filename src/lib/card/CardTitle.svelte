<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>
<div class={cn('flex flex-row text-xl font-bold')}>
	{@render children?.()}
</div>    

