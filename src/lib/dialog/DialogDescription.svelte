<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';
	let { class: className = '', children } = $props<{ class?: string; children?: Snippet }>();
</script>

<Dialog.Description class={cn('mb-4 text-sm opacity-90', className)}>
	{@render children?.()}
</Dialog.Description>
