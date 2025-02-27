<script lang="ts">
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';
	import FilePreview from './FilePreview.svelte';
	import Progress from '$lib/progress/Progress.svelte';
	import Button from '$lib/Button.svelte';

	let {
		accept = '',
		multiple = false,
		maxSize = 5 * 1024 * 1024, // 5MB default max size
		maxFiles = 10,
		value = $bindable<File[]>([]),
		disabled = false,
		variant = 'primary',
		label = '',
		required = false,
		error = false,
		class: className = '',
		onUpload = undefined,
		validateOn = 'input'
	}: {
		accept?: string;
		multiple?: boolean;
		maxSize?: number;
		maxFiles?: number;
		value?: File[];
		disabled?: boolean;
		variant?: Variant;
		label?: string;
		required?: boolean;
		error?: boolean | string;
		class?: string;
		onUpload?: (files: File[]) => Promise<void>;
		validateOn?: 'input' | 'blur';
	} = $props();

	const variantClasses = {
		primary: 'bg-primary/10 focus:bg-primary/20',
		secondary: 'bg-secondary/10 focus:bg-secondary/20',
		tertiary: 'bg-tertiary/10 focus:bg-tertiary/20',
		accent: 'bg-accent/10 focus:bg-accent/20',
		muted: 'bg-neutral/10 focus:bg-neutral/20',
		error: 'bg-error/10 focus:bg-error/20',
		success: 'bg-success/10 focus:bg-success/20',
		warning: 'bg-warning/10 focus:bg-warning/20',
		info: 'bg-info/10 focus:bg-info/20'
	};

	// State variables
	let dragOver = $state(false);
	let fileInputRef: HTMLInputElement;
	let validationError = $state<string | false>(false);
	let uploadProgress = $state<Record<string, number>>({});
	let isUploading = $state(false);
	let containerHeight = $state<number | null>(null);
	let containerRef: HTMLDivElement;

	// Handle file selection from input
	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files) return;
		
		const newFiles = Array.from(target.files);
		handleFiles(newFiles);
	}

	// Validate the selected files
	function validateFiles(files: File[]): string | false {
		if (files.length === 0 && required) return 'Please select at least one file.';
		
		if (files.length > maxFiles) return `You can only upload up to ${maxFiles} files.`;
		
		const oversizedFiles = files.filter(file => file.size > maxSize);
		if (oversizedFiles.length > 0) {
			const fileNames = oversizedFiles.map(f => f.name).join(', ');
			return `Files exceeding the ${formatSize(maxSize)} limit: ${fileNames}`;
		}
		
		if (accept) {
			const acceptedTypes = accept.split(',').map(type => type.trim());
			const invalidFiles = files.filter(file => {
				// Check if the file type is in the accepted types
				return !acceptedTypes.some(type => {
					if (type.startsWith('.')) {
						// Check file extension
						return file.name.toLowerCase().endsWith(type.toLowerCase());
					} else if (type.includes('*')) {
						// Handle wildcards like image/*
						const [category] = type.split('/');
						return file.type.startsWith(category);
					} else {
						// Exact MIME type match
						return file.type === type;
					}
				});
			});
			
			if (invalidFiles.length > 0) {
				const fileNames = invalidFiles.map(f => f.name).join(', ');
				return `Invalid file types: ${fileNames}. Accepted types: ${accept}`;
			}
		}
		
		return false;
	}

	// Handle files after they are selected or dropped
	function handleFiles(newFiles: File[]) {
		// If not multiple mode, replace existing files
		const filesToValidate = multiple ? [...value, ...newFiles] : [...newFiles];
		
		// Validate files
		validationError = validateFiles(filesToValidate);
		
		if (!validationError) {
			value = multiple ? [...value, ...newFiles] : [...newFiles];
		}
		
		error = validationError;
	}

	// Handle drag and drop events
	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		dragOver = true;
	}

	function handleDragLeave() {
		dragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragOver = false;
		
		if (event.dataTransfer?.files && !disabled) {
			const newFiles = Array.from(event.dataTransfer.files);
			handleFiles(newFiles);
		}
	}

	// Format file size for display
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

	// Remove a file from the selection
	function removeFile(index: number) {
		value = value.filter((_, i) => i !== index);
		// Remove progress for this file if it exists
		const fileKey = Object.keys(uploadProgress)[index];
		if (fileKey) {
			const newProgress = { ...uploadProgress };
			delete newProgress[fileKey];
			uploadProgress = newProgress;
		}
	}

	// Clear all selected files
	function clearFiles() {
		value = [];
		uploadProgress = {};
		if (fileInputRef) {
			fileInputRef.value = '';
		}
	}

	// Handle file upload with progress
	async function uploadFiles() {
		if (!onUpload || value.length === 0 || isUploading) return;
		
		isUploading = true;
		
		try {
			// Initialize progress for each file
			uploadProgress = value.reduce((acc, file, index) => {
				acc[`file_${index}`] = 0;
				return acc;
			}, {} as Record<string, number>);
			
			// Simulate file upload with progress
			for (let i = 0; i < value.length; i++) {
				const fileKey = `file_${i}`;
				
				// Simulate upload progress
				const updateProgress = (progress: number) => {
					uploadProgress = { ...uploadProgress, [fileKey]: progress };
				};
				
				// Simulate upload delay for demonstration
				for (let progress = 0; progress <= 100; progress += 5) {
					updateProgress(progress);
					await new Promise(resolve => setTimeout(resolve, 100));
				}
			}
			
			// Call the actual upload function provided by the user
			await onUpload(value);
			
			// Reset after successful upload
			clearFiles();
		} catch (error) {
			console.error('Upload failed:', error);
			validationError = 'Upload failed. Please try again.';
		} finally {
			isUploading = false;
		}
	}
	
	// Get appropriate icon based on file type
	function getFileIcon(file: File): string {
		if (file.type.startsWith('image/')) return 'mdi:file-image';
		if (file.type.startsWith('video/')) return 'mdi:file-video';
		if (file.type.startsWith('audio/')) return 'mdi:file-music';
		if (file.type.includes('pdf')) return 'mdi:file-pdf';
		if (file.type.includes('word') || file.type.includes('document')) return 'mdi:file-word';
		if (file.type.includes('excel') || file.type.includes('sheet')) return 'mdi:file-excel';
		if (file.type.includes('powerpoint') || file.type.includes('presentation')) return 'mdi:file-powerpoint';
		if (file.type.includes('zip') || file.type.includes('archive') || file.type.includes('compressed')) return 'mdi:file-zip';
		return 'mdi:file';
	}

	function initializeHeight() {
		if (!containerRef) return;
		// Only set initial height if we don't have one yet
		if (!containerHeight) {
			containerHeight = containerRef.clientHeight;
		}
	}
</script>

<div class="w-full">
	{#if label}
		<label class="mb-2 block text-sm font-medium" for={label}>
			{label}
			{#if required}
				<span class="text-error">*</span>
			{/if}
		</label>
	{/if}

	<div
		bind:this={containerRef}
		class={cn(
			'clay-inset transition-all duration-300 w-full',
			'flex flex-col relative',
			'cursor-pointer border-2 border-dashed border-foreground/10',
			dragOver && 'border-foreground/50 bg-foreground/5',
			disabled && 'cursor-not-allowed opacity-50',
			(error || validationError) && 'ring-2 ring-error',
			variantClasses[
				(error || validationError) ? 'error' : (variant as keyof typeof variantClasses)
			],
			containerHeight ? 'min-h-[' + containerHeight + 'px]' : 'min-h-[200px]',
			className
		)}
		role="button"
		tabindex="0"
		onclick={() => !disabled && fileInputRef.click()}
		onkeydown={(e) => e.key === 'Enter' && !disabled && fileInputRef.click()}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
	>
		<input
			type="file"
			{accept}
			{multiple}
			bind:this={fileInputRef}
			onchange={handleFileChange}
			class="hidden"
			{disabled}
			{required}
		/>

		<div class="w-full p-8 flex flex-col items-center justify-center h-full">
			{#if value.length === 0}
				<div class="flex flex-col items-center justify-center gap-4 text-center">
					<div class="rounded-full p-4 clay bg-foreground/10">
						<Icon icon="mdi:cloud-upload" class="h-12 w-12 text-foreground/80" />
					</div>
					<div class="space-y-1">
						<h3 class="text-lg font-semibold">Drop files here or click to upload</h3>
						<p class="text-sm text-foreground/60">
							{multiple ? 'Upload multiple files' : 'Upload a file'}
							{#if accept}
								<br />Accepted types: {accept}
							{/if}
							<br />Max size: {formatSize(maxSize)}
							{#if multiple}
								<br />Max files: {maxFiles}
							{/if}
						</p>
					</div>
				</div>
			{:else}
				<div class="w-full space-y-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">Selected Files ({value.length})</h3>
						<Button variant="muted" size="sm" onclick={clearFiles}>Clear All</Button>
					</div>
					<div class="grid gap-4 md:grid-cols-2 overflow-y-auto max-h-[300px] pr-1">
						{#each value as file, index}
							<FilePreview
								{file}
								icon={getFileIcon(file)}
								progress={uploadProgress[`file_${index}`] || 0}
								onRemove={() => removeFile(index)}
								showProgress={isUploading && uploadProgress[`file_${index}`] !== undefined}
							/>
						{/each}
					</div>
					{#if onUpload && !isUploading && value.length > 0}
						<Button variant="success" onclick={uploadFiles} class="mt-4 w-full">
							Upload {value.length} {value.length === 1 ? 'File' : 'Files'}
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if validationError || (error && typeof error === 'string')}
		<p class="mt-1 text-sm text-error">{validationError || error}</p>
	{/if}
</div>

<style>
	/* Add smooth scrolling for file list */
	.overflow-y-auto {
		scrollbar-width: thin;
		scrollbar-color: rgba(100, 100, 100, 0.5) transparent;
	}
	
	.overflow-y-auto::-webkit-scrollbar {
		width: 6px;
	}
	
	.overflow-y-auto::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background-color: rgba(100, 100, 100, 0.5);
		border-radius: 3px;
	}
</style>
