<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import Avatar from '$lib/Avatar.svelte';
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
			<CardTitle>Link Preview</CardTitle>
			<CardDescription>URL preview component</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Progress</CardTitle>
			<CardDescription>Progress indicator component</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Separator</CardTitle>
			<CardDescription>Visual content divider</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Tooltip</CardTitle>
			<CardDescription>Contextual information popup</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>
</Masonry>
