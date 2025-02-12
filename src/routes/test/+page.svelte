<script lang="ts">
	import Button from "$lib/Button.svelte";
	import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/index.js";
	import ThemeToggle from "$lib/ThemeToggle.svelte";
	import Icon from "@iconify/svelte";

	let theme = $state(false);
</script>

<div class="absolute top-4 right-4 z-10">
	<ThemeToggle  />
</div>

<div data-theme="light" class="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-blue-950 p-4">
	<Card>
		<CardHeader>
			<CardTitle>Modern Card Design</CardTitle>
			<CardDescription>
				<p>A beautiful and responsive card component</p>
			</CardDescription>
		</CardHeader>
		<CardBody>
			<p class="text-base">This is a modern card component with improved spacing and layout.</p>
			<img src="https://picsum.photos/400/200" alt="Random" class="w-full clay rounded-lg object-cover"/>
		</CardBody>
		<CardFooter>
			<p>Updated on 2025</p>
			<Button variant="secondary">
				Learn More<Icon icon="teenyicons:arrow-right-outline" height="20" class="ms-2"/>
			</Button>
		</CardFooter>
	</Card>
</div>