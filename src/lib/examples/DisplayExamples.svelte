<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import Avatar from '$lib/Avatar.svelte';
	import { Progress } from '$lib/progress/index.js';
	import { Separator } from '$lib/separator/index.js';
	import { onMount } from 'svelte';
    import Button from '$lib/Button.svelte';
    import Icon from '@iconify/svelte';

	let progressValue = $state(0);

	// Demo animation
	onMount(() => {
		const interval = setInterval(() => {
			progressValue = (progressValue + 1) % 101;
		}, 100);
		return () => clearInterval(interval);
	});
</script>

<h3 class="mb-6 text-xl font-bold">Display & Feedback Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<Card>
		<CardHeader>
			<CardTitle>Avatar</CardTitle>
			<CardDescription>User profile picture component</CardDescription>
		</CardHeader>
		<CardBody class="flex flex-wrap gap-4">
			<Avatar src="https://github.com/huntabyte.png" alt="@huntabyte" fallback="HB" size="sm" />
			<Avatar src="https://github.com/huntabyte.png" alt="@huntabyte" fallback="HB" />
			<Avatar src="https://github.com/huntabyte.png" alt="@huntabyte" fallback="HB" size="lg" />
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Progress</CardTitle>
			<CardDescription>Progress indicator component</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-8">
				<!-- Size Variants -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium">Sizes</h4>
					<Progress value={75} variant="primary" size="sm" />
					<Progress value={75} variant="primary" size="md" />
					<Progress value={75} variant="primary" size="lg" />
					<Progress value={75} variant="primary" size="xl" />
				</div>

				<!-- Label Positions -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium">Label Positions</h4>
					<Progress value={progressValue} variant="accent" showLabel={true} labelPosition="left" />
					<Progress value={progressValue} variant="info" showLabel={true} labelPosition="right" />
					<Progress value={progressValue} variant="success" showLabel={true} labelPosition="center" />
				</div>

				<!-- Vertical Progress -->
				<div class="space-y-4">
					<h4 class="text-sm font-medium">Vertical Orientation</h4>
					<div class="flex gap-8 h-[300px]">
						<Progress orientation="vertical" value={60} variant="primary" size="sm" />
						<Progress orientation="vertical" value={75} variant="accent" size="md" />
						<Progress orientation="vertical" value={45} variant="info" size="lg" showLabel={true} labelPosition="center" />
						<Progress orientation="vertical" value={30} variant="success" size="xl" />
					</div>
				</div>

				<!-- Different Variants -->
				<div class="grid gap-4">
					<Progress value={75} variant="error" showLabel={true} labelPosition="center" />
					<Progress value={60} variant="muted" showLabel={true} labelPosition="left" />
					<Progress value={45} variant="secondary" showLabel={true} labelPosition="right" />
					<Progress value={30} variant="tertiary" showLabel={true} labelPosition="center" />
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Separator</CardTitle>
			<CardDescription>Visual content divider</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="space-y-8">
					<!-- Example with Content -->
					<div>
						<div class="space-y-1">
							<h4 class="font-semibold">Bits UI Components</h4>
							<p class="text-sm text-muted-foreground">
								Modern UI components with claymorphic design
							</p>
						</div>
						<Separator variant="accent" class="my-4" />
						<div class="flex h-5 items-center space-x-4 text-sm">
							<div>Documentation</div>
							<Separator orientation="vertical" variant="info" />
							<div>Components</div>
							<Separator orientation="vertical" variant="info" />
							<div>Examples</div>
						</div>
					</div>
		
					<!-- Horizontal Variants -->
					<div class="space-y-4">
						<h4 class="text-sm font-medium">Horizontal Variants</h4>
						{#each ['primary', 'secondary', 'accent', 'muted', 'error', 'success', 'warning', 'info'] as variant}
							<div class="space-y-2">
								<span class="text-xs capitalize">{variant}</span>
								<Separator {variant} />
							</div>
						{/each}
					</div>
		
					<!-- Vertical Example -->
					<div>
						<h4 class="text-sm font-medium mb-4">Vertical Layout</h4>
						<div class="flex h-20 items-center justify-center space-x-4">
							<div class="text-center">
								<Icon icon="mdi:home" class="size-6 mb-2" />
								<div class="text-sm">Home</div>
							</div>
							<Separator orientation="vertical" variant="primary" />
							<div class="text-center">
								<Icon icon="mdi:folder" class="size-6 mb-2" />
								<div class="text-sm">Files</div>
							</div>
							<Separator orientation="vertical" variant="accent" />
							<div class="text-center">
								<Icon icon="mdi:cog" class="size-6 mb-2" />
								<div class="text-sm">Settings</div>
							</div>
						</div>
					</div>
		
					<!-- Content Sections -->
					<div class="space-y-4">
						<h4 class="text-sm font-medium">Content Sections</h4>
						<div class="space-y-4">
							<div>
								<h5 class="font-medium">Section 1</h5>
								<p class="text-sm text-muted-foreground">First section content</p>
							</div>
							<Separator variant="warning" decorative />
							<div>
								<h5 class="font-medium">Section 2</h5>
								<p class="text-sm text-muted-foreground">Second section content</p>
							</div>
							<Separator variant="success" decorative />
							<div>
								<h5 class="font-medium">Section 3</h5>
								<p class="text-sm text-muted-foreground">Third section content</p>
							</div>
						</div>
					</div>
				</div>
		</CardBody>
	</Card>
</Masonry>
