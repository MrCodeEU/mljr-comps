<script lang="ts">
	import { Button } from "$lib/index.js";
	import { CircleAlert } from 'lucide-svelte';
</script>

<div data-theme="dark" class="flex items-center justify-center h-screen bg-gray-200 dark:bg-blue-950">
	<Button variant="primary" onclick={() => alert()}><CircleAlert class="pe-0.5"/>Primary</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="tertiary">Tertiary</Button>
	<Button variant="accent">Accent</Button>
	<Button variant="muted">Muted</Button>
	<Button variant="error">Error</Button>
	<Button variant="success">Success</Button>
	<Button variant="warning">Warning</Button>
	<Button variant="info">Info</Button>
</div>