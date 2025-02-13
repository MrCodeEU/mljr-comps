<script lang="ts">
	import { Button } from "$lib/index.js";
	import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/index.js";
	import Icon from "@iconify/svelte";
	import ThemeToggle from "$lib/ThemeToggle.svelte";
</script>

<div class="absolute top-4 right-4 z-10">
	<ThemeToggle  />
</div>
<div class="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-blue-950 p-4">

<Button variant="primary" onclick={() => alert()}><Icon icon="material-symbols:brightness-alert-outline" height="auto" class="pe-0.5"/>Primary</Button>
<Button variant="secondary">Secondary <Icon icon="line-md:loading-alt-loop" height="auto" /></Button>
<Button variant="tertiary"><Icon icon="vscode-icons:file-type-svelte" height="22" class="me-5" />Tertiary<Icon icon="vscode-icons:file-type-svelte" height="22" class="ms-5" /></Button>
<Button variant="accent">Accent</Button>
<Button variant="muted">Muted</Button>
<Button variant="error">Error</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>

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