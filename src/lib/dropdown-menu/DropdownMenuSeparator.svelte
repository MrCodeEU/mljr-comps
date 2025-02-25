<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { cn } from '$lib/utility.js';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<DropdownMenu.Separator class={cn('bg-text my-1.5 h-px', className)} />
