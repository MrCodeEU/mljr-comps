<script lang="ts">
	import Input from '$lib/input/Input.svelte';
	import Progress from '$lib/progress/Progress.svelte';
	import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

	let {
		strengthLabels = $bindable(['Weak', 'Medium', 'Strong', 'Very Strong', 'Super Strong']),
	} = $props();
	
	let password = $state('');
	let score = $state(0);

	const SCORE_THRESHOLDS = [
		{ max: 5, variant: 'error', index: 0 },
		{ max: 10, variant: 'warning', index: 1 },
		{ max: 15, variant: 'secondary', index: 2 },
		{ max: 19, variant: 'success', index: 3 }
	];

	// Initialize zxcvbn once
	zxcvbnOptions.setOptions({
		translations: zxcvbnEnPackage.translations,
		graphs: zxcvbnCommonPackage.adjacencyGraphs,
		dictionary: {
			...zxcvbnCommonPackage.dictionary,
			...zxcvbnEnPackage.dictionary
		}
	});

	let result = $derived.by(() => zxcvbn(password));
	$effect(() => { score = result.guessesLog10; });

	let variant = $derived.by(() => {
		const threshold = SCORE_THRESHOLDS.find(t => score < t.max);
		return threshold?.variant ?? 'success';
	});

	let strengthText = $derived.by(() => {
		const threshold = SCORE_THRESHOLDS.find(t => score < t.max);
		return strengthLabels[threshold?.index ?? 4];
	});

	// Find the longest label and calculate its width
	let textWidth = $derived.by(() => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (!context) return '30%';
		
		const style = getComputedStyle(document.body);
		context.font = `${style.fontSize} ${style.fontFamily}`;
		
        const longestLabel = strengthLabels.reduce((a, b) => 
            a.length > b.length ? a : b
        );
		
		return `${context.measureText(longestLabel).width + 50}px`;
	});
</script>

<div class="flex flex-col items-center justify-center space-y-4">
	<Input type="password" placeholder="Enter your password" bind:value={password} />
	<div class="flex items-center w-full gap-4">
		<Progress value={score} max={20} {variant} size="sm" />
		<span style="width: {textWidth}; white-space: nowrap;">{strengthText}</span>
	</div>
</div>
