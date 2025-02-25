<script lang="ts">
    import { cx, cy } from './util';
    import { cn } from '$lib/utility.js';

    let className = $state('');
    let i = $state(0);
    let div = $state(12);
    let length = $state(40);
    let r = $state(9);
    let step = $state(0);
    let betweenDiv = $derived(step && i % step !== 0);
</script>

<svelte:options namespace="svg" />

<line
	class={cn('stroke-primary stroke-[0.5] transition-all duration-200', className)}
	x1={0}
	y1={0}
	x2={cx(i, length, div)}
	y2={cy(i, length, div)}
/>

<circle
	class={cn('fill-primary transition-colors', className)}
	cx={cx(i, length, div)}
	cy={cy(i, length, div)}
	{r}
/>

{#if betweenDiv}
	<line
		class="stroke-white"
		x1={cx(i, length - 3, div)}
		y1={cy(i, length - 3, div)}
		x2={cx(i, length + 3, div)}
		y2={cy(i, length + 3, div)}
	/>
{/if}

<style>

</style>
