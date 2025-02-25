<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import type { WithoutChildrenOrChild } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		class: className = '',
		children
	}: WithoutChildrenOrChild<ContextMenu.RootProps> & {
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<ContextMenu.Root bind:open>
	{@render children?.()}
</ContextMenu.Root>
