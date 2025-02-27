<script lang="ts">
    let {
        className = '',
        i = 0,
        div = 12,
        length = 40,
        r = 9,
        step = 0
    } = $props();

    let betweenDiv = $derived(step && i % step !== 0);
    import { cx, cy } from './util.js';
    import { cn } from '$lib/utility.js';
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
