<script lang="ts">
	import { cn } from '$lib/utility.js';
	import { markerIndex2Rad, cx, cy } from './util';
	import TimePickerFace from './TimePickerFace.svelte';
	import TimePickerHand from './TimePickerHand.svelte';

	let {
		value = $bindable(new Date()),
		variant = 'primary',
		format = '24', // '12' | '24'
		showSeconds = false,
		disabled = false,
		class: className = ''
	} = $props();

	const markerDist = [40, 26]; // [outer, inner]
	const markerRadius = [9, 7];

	let currentMode = $state(0); // 0: hours, 1: minutes, 2: seconds
	let hover = $state<number | null>(null);
	let svgRef = $state<SVGSVGElement | null>(null);
	let time = $state([value.getHours(), value.getMinutes(), value.getSeconds()]);

	// Mode configurations
	const modes = [
		{
			// Hours
			div: 12,
			faces: [
				{
					r: markerDist[0],
					markers: [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
					markerRadius: markerRadius[0]
				},
				{
					r: markerDist[1],
					markers: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
					markerRadius: markerRadius[1],
					class: 'inner'
				}
			]
		},
		{
			// Minutes
			div: 60,
			step: 5,
			faces: [
				{
					r: markerDist[0],
					markerRadius: markerRadius[0],
					markers: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
				}
			]
		},
		{
			// Seconds
			div: 60,
			step: 5,
			faces: [
				{
					r: markerDist[0],
					markerRadius: markerRadius[0],
					markers: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
				}
			]
		}
	];

	function moveHour(pos: { x: number; y: number }) {
		const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
		const s = ((Math.PI + -Math.atan2(pos.x, pos.y)) / Math.PI / 2) * 12 + 0.5;
		const s1 = Math.floor(s >= 12 ? 0 : s);
		const isInner = dist < markerDist[1] + markerRadius[1];
		const isPM = s1 === 0 ? !isInner : isInner;
		return s1 + (isPM ? 0 : 12);
	}

	function moveMinuteOrSecond(pos: { x: number; y: number }) {
		const s = ((Math.PI + -Math.atan2(pos.x, pos.y)) / Math.PI / 2) * 60 + 0.5;
		return Math.floor(s >= 60 ? 0 : s);
	}

	function getCursorPoint(evt: MouseEvent | Touch) {
		if (!svgRef) return { x: 0, y: 0 };
		const pt = svgRef.createSVGPoint();
		pt.x = evt.clientX;
		pt.y = evt.clientY;
		return pt.matrixTransform(svgRef.getScreenCTM()?.inverse());
	}

	function move(e: MouseEvent | Touch, changeHover = true) {
		if (!changeHover) {
			hover = null;
		}
		const pos = getCursorPoint(e);
		const r = currentMode === 0 ? moveHour(pos) : moveMinuteOrSecond(pos);
		if (changeHover) {
			hover = r;
		} else {
			time[currentMode] = r;
		}
	}

	function updateValue() {
		const [hours, minutes, seconds] = time;
		const newDate = new Date(value);
		newDate.setHours(hours);
		newDate.setMinutes(minutes);
		newDate.setSeconds(seconds);
		value = newDate;
		
		if (currentMode < (showSeconds ? 2 : 1)) {
			currentMode++;
		} else {
			currentMode = 0;
		}
		hover = null;
	}

	$effect(() => {
		time = [value.getHours(), value.getMinutes(), value.getSeconds()];
	});

	function formatNumber(num: number): string {
		return num.toString().padStart(2, '0');
	}
</script>

<div class={cn('clay w-[20rem] bg-background', className)}>
	<div class="flex items-center justify-center space-x-2 bg-white p-4 text-center text-3xl">
		<span
			class={cn(
				'cursor-pointer px-2',
				currentMode === 0 && 'clay text-primary',
				disabled && 'cursor-not-allowed opacity-50'
			)}
			on:click={() => !disabled && (currentMode = 0)}
		>
			{formatNumber(time[0])}
		</span>
		<span>:</span>
		<span
			class={cn(
				'cursor-pointer px-2',
				currentMode === 1 && 'clay text-primary',
				disabled && 'cursor-not-allowed opacity-50'
			)}
			on:click={() => !disabled && (currentMode = 1)}
		>
			{formatNumber(time[1])}
		</span>
		{#if showSeconds}
			<span>:</span>
			<span
				class={cn(
					'cursor-pointer px-2',
					currentMode === 2 && 'clay text-primary',
					disabled && 'cursor-not-allowed opacity-50'
				)}
				on:click={() => !disabled && (currentMode = 2)}
			>
				{formatNumber(time[2])}
			</span>
		{/if}
	</div>

	<svg
		viewBox="-50 -50 100 100"
		bind:this={svgRef}
		class="m-4"
		on:touchstart|preventDefault={(e) => move(e.changedTouches[0], false)}
		on:touchmove|preventDefault={(e) => move(e.changedTouches[0], false)}
		on:touchend={updateValue}
		on:mousedown|preventDefault={(e) => move(e, false)}
		on:mousemove|preventDefault={(e) => move(e, !e.buttons)}
		on:mouseup={updateValue}
		on:mouseleave={() => (hover = null)}
	>
		<circle class="fill-white" cx={0} cy={0} r={markerDist[0] + markerRadius[0]} />

		{#if currentMode === 0}
			{#each modes[currentMode].faces as face, i}
				{#if face.markers.includes(time[0])}
					<TimePickerHand
						i={face.markers.indexOf(time[0])}
						div={modes[currentMode].div}
						length={face.r}
						r={face.markerRadius}
						step={modes[currentMode].step}
					/>
				{/if}
				{#if face.markers.includes(hover)}
					<TimePickerHand
						i={face.markers.indexOf(hover)}
						div={modes[currentMode].div}
						length={face.r}
						class="hover"
						r={face.markerRadius}
						step={modes[currentMode].step}
					/>
				{/if}
			{/each}
		{:else}
			<TimePickerHand
				i={time[currentMode]}
				div={modes[currentMode].div}
				length={modes[currentMode].faces[0].r}
				r={markerRadius[Math.floor(time[currentMode] / modes[currentMode].div)]}
				step={modes[currentMode].step}
			/>
			{#if hover !== null}
				<TimePickerHand
					i={hover}
					div={modes[currentMode].div}
					length={modes[currentMode].faces[0].r}
					class="hover"
					r={markerRadius[Math.floor(hover / modes[currentMode].div)]}
					step={modes[currentMode].step}
				/>
			{/if}
		{/if}

		{#each modes[currentMode].faces as face}
			<TimePickerFace class={face.class} r={face.r} markers={face.markers} />
		{/each}

		<circle class="clay fill-primary" cx={0} cy={0} r={1} />
	</svg>
</div>

<style>
	/* Additional custom styles here */
</style>
