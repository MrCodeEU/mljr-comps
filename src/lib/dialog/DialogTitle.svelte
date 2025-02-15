<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';
	let { class: className = '', children } = $props<{ class?: string; children?: Snippet }>();
</script>

<Dialog.Title class={cn('mb-2 text-xl font-bold', className)}>
	{@render children?.()}
</Dialog.Title>
