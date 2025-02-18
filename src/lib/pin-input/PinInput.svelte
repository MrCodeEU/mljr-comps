<script lang="ts">
	import { PinInput as BitsPin, REGEXP_ONLY_DIGITS, type PinInputRootSnippetProps } from 'bits-ui';
	import { cn } from '$lib/utility.js';

	type CellProps = PinInputRootSnippetProps['cells'][0];

	let {
		value = $bindable(''),
		variant = 'primary',
		maxlength = 6,
		separator = true,
		pattern = REGEXP_ONLY_DIGITS,
		disabled = false,
		showCaret = true,
		onComplete = undefined,
		class: className = ''
	}: {
		value?: string;
		variant?: Variant;
		maxlength?: number;
		separator?: boolean;
		pattern?: string;
		disabled?: boolean;
		showCaret?: boolean;
		onComplete?: (value: string) => void;
		class?: string;
	} = $props();

	const variantClasses = {
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black dark:text-white',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};

	const segmentLength = $derived(Math.floor(maxlength / 2));
</script>

<BitsPin.Root
	bind:value
	{maxlength}
	{pattern}
	{disabled}
	{onComplete}
	class={cn('group/pin flex items-center gap-3', className)}
>
	{#snippet children({ cells })}
		<div class="flex gap-2">
			{#each cells.slice(0, segmentLength) as cell}
				{@render Cell(cell)}
			{/each}
		</div>

		{#if separator}
			<div class="flex w-3 items-center justify-center">
				<div class="h-1 w-2 rounded-full bg-text/20" ></div>
			</div>
		{/if}

		<div class="flex gap-2">
			{#each cells.slice(segmentLength, maxlength) as cell}
				{@render Cell(cell)}
			{/each}
		</div>
	{/snippet}
</BitsPin.Root>

{#snippet Cell(cell: CellProps)}
	<BitsPin.Cell
		{cell}
		class={cn(
			'relative h-12 w-10 clay text-xl',
			'flex items-center justify-center',
			'transition-all duration-75',
			'data-[active]:clay-inset',
			disabled && 'opacity-50 cursor-not-allowed',
			variantClasses[variant as keyof typeof variantClasses]
		)}
	>
		{#if cell.char !== null}
			<div class="select-none">{cell.char}</div>
		{/if}
		{#if cell.hasFakeCaret && showCaret}
			<div class="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
				<div class="h-8 w-px bg-current" ></div>
			</div>
		{/if}
	</BitsPin.Cell>
{/snippet}

<style>
	@keyframes caret-blink {
		0%,
		70% {
			opacity: 1;
		}
		70.1%,
		100% {
			opacity: 0;
		}
	}
</style>
