<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';
	import AlertDialogContent from './AlertDialogContent.svelte';
	import AlertDialogTrigger from './AlertDialogTrigger.svelte';
	import Button from '$lib/Button.svelte';

	let {
		open = $bindable(false),
		title,
		description,
		triggerText = 'Open',
		cancelText = 'Cancel',
		actionText = 'Confirm',
		variant = 'primary',
		cardVariant = 'default',
		showButtons = true,
		cancelVariant = 'muted',
		onAction,
		closeOnOutsideClick = false,
		class: className = ''
	}: {
		open?: boolean;
		title: Snippet;
		description: Snippet;
		triggerText?: string;
		cancelText?: string;
		actionText?: string;
		variant?:
			| 'primary'
			| 'secondary'
			| 'tertiary'
			| 'accent'
			| 'muted'
			| 'error'
			| 'success'
			| 'warning'
			| 'info';
		cardVariant?:
			| 'default'
			| 'primary'
			| 'secondary'
			| 'tertiary'
			| 'accent'
			| 'muted'
			| 'error'
			| 'success'
			| 'warning'
			| 'info';
		showButtons?: boolean;
		cancelVariant?:
			| 'primary'
			| 'secondary'
			| 'tertiary'
			| 'accent'
			| 'muted'
			| 'error'
			| 'success'
			| 'warning'
			| 'info';
		onAction?: () => void | Promise<void>;
		closeOnOutsideClick?: boolean;
		class?: string;
	} = $props();

	const cardVariantStyles = {
		default: 'bg-background text-black dark:text-white',
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};

	async function handleAction() {
		if (onAction) {
			await onAction();
		}
		open = false;
	}

	function handleOutsideClick(e: boolean) {
		if (closeOnOutsideClick && !e) {
			open = false;
		}
		return e;
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialogTrigger {variant}>
		{triggerText}
	</AlertDialogTrigger>

	<AlertDialogContent class={cn('clay', cardVariantStyles[cardVariant], className)}>
		<div class="grid gap-4">
			<AlertDialog.Title class="text-lg font-bold">
				{@render title()}
			</AlertDialog.Title>
			<AlertDialog.Description class="text-inherit opacity-80">
				{@render description()}
			</AlertDialog.Description>
		</div>
		{#if showButtons}
			<div class="mt-4 flex justify-end gap-2">
				<AlertDialog.Cancel>
					<Button variant={cancelVariant}>
						{cancelText}
					</Button>
				</AlertDialog.Cancel>
				<AlertDialog.Action>
					<Button {variant} onclick={handleAction}>
						{actionText}
					</Button>
				</AlertDialog.Action>
			</div>
		{/if}
	</AlertDialogContent>
</AlertDialog.Root>
