<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import Tab from '$lib/tab/Tab.svelte';
	import TabTrigger from '$lib/tab/TabTrigger.svelte';
	import TabContent from '$lib/tab/TabContent.svelte';
</script>

<div class="absolute top-4 right-4 z-10">
	<ThemeToggle leftLabel="Light Mode" rightLabel="Dark Mode" />
</div>
<div class="flex min-h-screen items-center justify-center bg-gray-200 p-4 dark:bg-blue-950">
	<div class="w-full max-w-3xl space-y-8">
		<Tab value="tab1" class="w-full">
			{#snippet triggers()}
				<TabTrigger value="tab1">First Tab</TabTrigger>
				<TabTrigger value="tab2">Second Tab</TabTrigger>
				<TabTrigger value="tab3">Third Tab</TabTrigger>
			{/snippet}

			{#snippet content()}
				<TabContent value="tab1">
					<h3 class="mb-2 text-xl font-bold">First Tab Content</h3>
					<p>This is the content for the first tab.</p>
				</TabContent>
				<TabContent value="tab2">
					<h3 class="mb-2 text-xl font-bold">Second Tab Content</h3>
					<p>This is the content for the second tab.</p>
				</TabContent>
				<TabContent value="tab3">
					<h3 class="mb-2 text-xl font-bold">Third Tab Content</h3>
					<p>This is the content for the third tab.</p>
				</TabContent>
			{/snippet}
		</Tab>

		<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
			<Button>Primary Button</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="tertiary">Tertiary</Button>
			<Button variant="accent">Accent</Button>
			<Button variant="muted">Muted</Button>
			<Button variant="error">Error</Button>
			<Button variant="success">Success</Button>
			<Button variant="warning">Warning</Button>
			<Button variant="info">Info</Button>
			<Button active={false}>Disabled</Button>
			<Button onclick={() => alert('Clicked!')}>With Click</Button>
		</div>
	</div>
</div>
