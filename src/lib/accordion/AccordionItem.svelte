<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';
	import AccordionTrigger from './AccordionTrigger.svelte';
	import AccordionContent from './AccordionContent.svelte';

	let {
		value,
		title,
		content,
		variant = 'primary',
		class: className = ''
	}: {
		value: string;
		title: Snippet;
		content: Snippet;
		variant?: Variant;
		class?: string;
	} = $props();
</script>

<Accordion.Item {value} class={cn('mb-2', className)}>
	<Accordion.Header>
		<AccordionTrigger {variant}>
			{@render title?.()}
		</AccordionTrigger>
	</Accordion.Header>
	<AccordionContent>
		{@render content?.()}
	</AccordionContent>
</Accordion.Item>
