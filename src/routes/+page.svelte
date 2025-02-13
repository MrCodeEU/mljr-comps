<script lang="ts">
    import Button from '$lib/Button.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
</script>

<div class="absolute top-4 right-4 z-10">
	<ThemeToggle leftLabel="Light Mode" rightLabel="Dark Mode" />
</div>
<div class="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-blue-950 p-4">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
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