<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import { cn } from '$lib/utility.js';

	let { class: className = '' } = $props();
</script>

<ContextMenu.Separator class={cn('bg-text/50 clay-inset my-1 h-[3px]', className)} />
