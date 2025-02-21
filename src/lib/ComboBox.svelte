<script lang="ts">
	import { Combobox, type WithoutChild } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';

	export type Item = {
		value: string;
		label: string;
		selectedLabel?: string;
		icon?: string;
		disabled?: boolean;
		type?: 'single' | 'multiple';
	};

	type SingleProps = Omit<WithoutChild<Combobox.RootProps>, 'value'> & {
		value?: string;
		items: Item[];
	};

	type MultipleProps = Omit<WithoutChild<Combobox.RootProps>, 'value'> & {
		value?: string[];
		items: Item[];
	};

	type BaseProps = {
		variant?: Variant;
		icon?: string;
		placeholder?: string;
		viewportClass?: string;
		inputClass?: string;
		contentClass?: string;
		disabled?: boolean;
		class?: string;
	};

	type Props = (SingleProps | MultipleProps) & BaseProps;

	let {
		items,
		variant = 'primary',
		icon,
		placeholder = 'Select an item...',
		viewportClass = '',
		inputClass = '',
		contentClass = '',
		class: className = '',
		disabled = false,
		type = 'single',
		value = $bindable<string | string[] | undefined>(undefined),
		...restProps
	}: Props = $props();

	let searchValue = $state('');
	let open = $state(false);

	function handleValueChange(newValue: string | string[] | undefined) {
		if (newValue === value) return;
		if (type === 'single' && typeof newValue === 'string') {
			value = newValue;
		} else if (type === 'multiple' && Array.isArray(newValue)) {
			value = newValue;
		}
	}

	// Force string type for single mode initial value
	$effect(() => {
		if (type === 'single' && typeof value === 'undefined') {
			value = '';
		}
	});

	const filteredItems = $derived(
		searchValue === ''
			? items
			: items.filter((item: Item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
	);

	const variantClasses = {
		primary: 'bg-primary/40 text-primary',
		secondary: 'bg-secondary/40 text-secondary',
		tertiary: 'bg-tertiary/40 text-tertiary',
		accent: 'bg-accent/40 text-accent',
		muted: 'bg-neutral/40 text-neutral',
		error: 'bg-error/40 text-error',
		success: 'bg-success/40 text-success',
		warning: 'bg-warning/40 text-warning',
		info: 'bg-info/40 text-info'
	};

	const variantContent = {
		default: 'clay bg-white',
		primary: 'clay bg-primary',
		secondary: 'clay bg-secondary',
		tertiary: 'clay bg-tertiary',
		accent: 'clay bg-accent',
		muted: 'clay bg-white',
		error: 'clay bg-error',
		success: 'clay bg-success',
		warning: 'clay bg-warning',
		info: 'clay bg-info'
	};
	let inputText = $derived.by(() => {
		if (items.length === 0) return placeholder;
		if (typeof value === 'string') {
			const item = items.find((i) => i.value === value);
			return item?.label ?? placeholder;
		} else if (Array.isArray(value) && value.length > 0) {
			const lastValue = value[value.length - 1];
			const item = items.find((i) => i.value === lastValue);
			return item?.label ?? placeholder;
		}
		return placeholder;
	});

	let selected = $derived(
		type === 'single' 
			? value === (items[0]?.value ?? '') 
			: Array.isArray(value) && value.includes(items[0]?.value ?? '')
	);
</script>

<Combobox.Root
	{...restProps}
	type={type}
	{value}
	bind:open
	onOpenChange={(o) => {
		if (!o) searchValue = '';
	}}
	onValueChange={handleValueChange}
>
	<div class={cn('relative', className)}>
		{#if icon}
			<Icon {icon} class="absolute start-3 top-1/2 size-5 -translate-y-1/2" />
		{/if}
		<Combobox.Input
			onfocus={(e) => (open = true)}
			onclick={(e) => e.currentTarget.select()}
			oninput={(e) => (searchValue = e.currentTarget.value)}
			defaultValue={inputText}
			class={cn(
				'inline-flex h-10 w-full truncate rounded-xl transition-colors',
				'focus:ring-2 focus:ring-offset-2 focus:outline-none',
				icon ? 'pr-10 pl-10' : 'px-4',
				variantClasses[variant as keyof typeof variantClasses],
				'clay-inset',
				        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
				inputClass
			)}
			disabled={disabled}
		>
			{inputText}
		</Combobox.Input>
		<div class="absolute end-3 top-1/2 -translate-y-1/2">
			<Combobox.Trigger class={cn(
        "flex items-center justify-center",
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    )}
												{disabled}
			>
				<Icon icon="mdi:chevron-down" class="size-5" />
			</Combobox.Trigger>
		</div>
	</div>

	<Combobox.Portal>
		<Combobox.Content
			class={cn(
				'z-50 min-w-[var(--bits-combobox-anchor-width)] overflow-hidden rounded-t-none p-1',
				variantContent[variant as keyof typeof variantContent],
				contentClass
			)}
		>
			<Combobox.ScrollUpButton class="flex w-full items-center justify-center py-1">
				<Icon icon="mdi:chevron-double-up" class="size-4" />
			</Combobox.ScrollUpButton>
			<Combobox.Viewport class={cn('max-h-[600px] overflow-y-auto p-1', viewportClass)}>
				{#each filteredItems as item (item.value)}
					<Combobox.Item
						value={item.value}
						label={item.label}
						class={cn(
							'flex items-center gap-2 rounded-lg px-3 py-2',
							'data-[highlighted]:clay-inset data-[selected]:bg-primary/10',
							'hover:bg-gray/50 hover:clay-inset'
						)}
					>
						{#snippet children({ selected })}
							{#if item.icon}
								<Icon icon={item.icon} class="size-5" />
							{/if}
							<span>{item.selectedLabel ?? item.label}</span>
							{#if selected}
								<Icon icon="mdi:check" class="ml-auto size-5" />
							{/if}
						{/snippet}
					</Combobox.Item>
				{:else}
					<span class="block p-2 text-sm text-neutral"> No results found </span>
				{/each}
			</Combobox.Viewport>
            <Combobox.ScrollDownButton class="flex w-full items-center justify-center py-1">
                <Icon icon="mdi:chevron-double-down" class="size-4" />
            </Combobox.ScrollDownButton>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
