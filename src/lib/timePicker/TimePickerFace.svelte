<script lang="ts">
	import { cx, cy } from './util';
	import { cn } from '$lib/utility.js';

	let { class: className = '', r = 40, markers = [] } = $props<{
		class?: string;
		r?: number;
		markers?: number[];
	}>();
</script>

<svelte:options namespace="svg" />

{#each markers as t, i}
	<text
		class={cn('select-none text-[7px] leading-none', className)}
		x={cx(i, r)}
		y={cy(i, r)}
		text-anchor="middle"
		dominant-baseline="central"
	>
		{t}
	</text>
{/each}

<style>
	text.inner {
		font-size: 5px;
	}
</style>
