<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		children
	}: {
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<Collapsible.Content forceMount={true} class={cn('overflow-hidden', className)}>
	{#snippet child({ props, open })}
		{#if open}
			<div {...props} transition:slide={{ duration: 200 }}>
				<div class="p-4">
					{@render children?.()}
				</div>
			</div>
		{/if}
	{/snippet}
</Collapsible.Content>
