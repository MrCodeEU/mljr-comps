<script lang="ts">
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import Tab from '$lib/tab/Tab.svelte';
	import TabTrigger from '$lib/tab/TabTrigger.svelte';
	import TabContent from '$lib/tab/TabContent.svelte';
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import InputExamples from '$lib/examples/InputExamples.svelte';
	import NavigationExamples from '$lib/examples/NavigationExamples.svelte';
	import DisplayExamples from '$lib/examples/DisplayExamples.svelte';
	import LayoutExamples from '$lib/examples/LayoutExamples.svelte';
	import OverlayExamples from '$lib/examples/OverlayExamples.svelte';
	import Toast from '$lib/toast/Toast.svelte';

	let refreshLayout: () => void;
</script>
<main class="bg-white dark:bg-purple-950">
<Toast />
<div class="absolute top-4 right-4 z-10">
	<ThemeToggle leftLabel="Light Mode" rightLabel="Dark Mode" />
</div>
<div class="flex min-h-screen items-center justify-center pt-16">
	<Card class="w-[90%]">
		<CardHeader>
			<CardTitle class="text-center text-3xl font-bold">MLJR Components in Claymorphism</CardTitle>
			<CardDescription class="text-center"
				>A collection of beautiful, accessible, and reusable components</CardDescription
			>
		</CardHeader>
		<CardBody>
			<Tab value="input" class="w-full">
				{#snippet triggers()}
					<TabTrigger value="input" variant="primary">Input & Form</TabTrigger>
					<TabTrigger value="navigation" variant="accent">Navigation & Menus</TabTrigger>
					<TabTrigger value="display" variant="error">Display & Feedback</TabTrigger>
					<TabTrigger value="layout" variant="info">Layout & Structure</TabTrigger>
					<TabTrigger value="overlay" variant="secondary">Overlay & Popups</TabTrigger>
				{/snippet}

				{#snippet content()}
					<TabContent value="input" class="bg-primary/20">
						<InputExamples />
					</TabContent>

					<TabContent value="navigation" class="bg-accent/20">
						<NavigationExamples />
					</TabContent>

					<TabContent value="display" class="bg-error/20">
						<DisplayExamples />
					</TabContent>

					<TabContent value="layout" class="bg-info/20">
						<LayoutExamples />
					</TabContent>

					<TabContent value="overlay" class="bg-secondary/20">
						<OverlayExamples />
					</TabContent>
				{/snippet}
			</Tab>
		</CardBody>
	</Card>
</div>
</main>
