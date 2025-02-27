<script lang="ts">
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';
	import Progress from '$lib/progress/Progress.svelte';

	let {
		file,
		icon = 'mdi:file',
		progress = 0,
		showProgress = false,
		onRemove,
		class: className = ''
	}: {
		file: File;
		icon?: string;
		progress?: number;
		showProgress?: boolean;
		onRemove?: () => void;
		class?: string;
	} = $props();

	let imageUrl = $state<string | null>(null);
	let isImage = file.type.startsWith('image/');

	// Function to format file size
	function formatSize(bytes: number): string {
		const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
		let unitIndex = 0;
		let size = bytes;
		
		while (size >= 1024 && unitIndex < units.length - 1) {
			size /= 1024;
			unitIndex++;
		}
		
		return `${size.toFixed(1)} ${units[unitIndex]}`;
	}

	// Generate preview URL for image files
	$effect(() => {
		if (isImage) {
			imageUrl = URL.createObjectURL(file);
			return () => {
				if (imageUrl) URL.revokeObjectURL(imageUrl);
			};
		}
	});
</script>

<div 
	class={cn(
		'clay relative flex items-center gap-3 p-3 transition-all duration-200',
		'min-h-[4rem]', // Add consistent height
		showProgress && 'opacity-90',
		className
	)}
>
	<div class="flex-shrink-0">
		{#if isImage && imageUrl}
			<div class="h-12 w-12 overflow-hidden rounded">
				<img src={imageUrl} alt={file.name} class="h-full w-full object-cover" />
			</div>
		{:else}
			<div class="flex h-12 w-12 items-center justify-center rounded bg-foreground/10">
				<Icon {icon} class="h-6 w-6 text-foreground/80" />
			</div>
		{/if}
	</div>

	<div class="min-w-0 flex-1">
		<div class="truncate text-sm font-medium">{file.name}</div>
		<div class="text-xs text-foreground/60">{formatSize(file.size)}</div>
		
		{#if showProgress}
			<div class="mt-1">
				<Progress value={progress} size="sm" variant={progress === 100 ? 'success' : 'info'} />
			</div>
		{/if}
	</div>

	{#if onRemove && !showProgress}
		<button 
			type="button" 
			class="flex-shrink-0 rounded p-1 text-foreground/60 hover:bg-error/10 hover:text-error transition-colors"
			onclick={onRemove}
		>
			<Icon icon="mdi:close" class="h-5 w-5" />
		</button>
	{/if}
</div>
