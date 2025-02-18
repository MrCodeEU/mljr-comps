<script lang="ts">
	import { Separator } from 'bits-ui';
	import { cn } from '$lib/utility.js';

	let {
		orientation = 'horizontal',
		variant = 'muted',
		decorative = false,
		class: className = ''
	}: {
		orientation?: 'horizontal' | 'vertical';
		variant?: Variant;
		decorative?: boolean;
		class?: string;
	} = $props();

	const variantClasses = {
		primary: 'bg-primary/20',
		secondary: 'bg-secondary/20',
		tertiary: 'bg-tertiary/20',
		accent: 'bg-accent/20',
		muted: 'bg-neutral/20',
		error: 'bg-error/20',
		success: 'bg-success/20',
		warning: 'bg-warning/20',
		info: 'bg-info/20'
	};

	const orientationClasses = {
		horizontal: 'h-px w-full',
		vertical: 'h-full w-px'
	};
</script>

<Separator.Root
	{orientation}
	{decorative}
	class={cn(
		'shrink-0 clay-inset',
		orientationClasses[orientation],
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
/>
