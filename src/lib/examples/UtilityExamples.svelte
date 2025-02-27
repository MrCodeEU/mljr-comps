<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import { Tooltip } from '$lib/tooltip/index.js';
	import Icon from '@iconify/svelte';

	// Placeholders for demo purposes
	let countdown = $state(60);
	let themeMode = $state('light');

	// Demo countdown
	function startCountdown() {
		countdown = 60;
		const interval = setInterval(() => {
			countdown--;
			if (countdown <= 0) {
				clearInterval(interval);
			}
		}, 1000);
	}
</script>

<h3 class="mb-6 text-xl font-bold">Utility Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<!-- Tooltip is already implemented in OverlayExamples, but we'll show it here too -->
	<Card>
		<CardHeader>
			<CardTitle>Tooltip</CardTitle>
			<CardDescription>Informative hover tooltips</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<!-- Basic Tooltip -->
				<Tooltip variant="primary">
					{#snippet trigger()}
						<Button variant="primary">
							<Icon icon="mdi:information" />
						</Button>
					{/snippet}
					Basic tooltip info
				</Tooltip>

				<!-- Different Variants -->
				<Tooltip variant="accent">
					{#snippet trigger()}
						<Button variant="accent">
							<Icon icon="mdi:help" />
						</Button>
					{/snippet}
					Need help?
				</Tooltip>
			</div>
		</CardBody>
	</Card>

	<!-- Placeholder for Countdown -->
	<Card>
		<CardHeader>
			<CardTitle>Countdown</CardTitle>
			<CardDescription>Number animations for timers</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<div class="clay flex h-20 items-center justify-center rounded-xl text-3xl font-bold">
					{countdown}s
				</div>
				<Button onclick={startCountdown} active={countdown <= 0}>
					{countdown > 0 ? 'Counting down...' : 'Start Countdown'}
				</Button>
			</div>
		</CardBody>
	</Card>

	<!-- Placeholder for Keyboard Shortcuts -->
	<Card>
		<CardHeader>
			<CardTitle>Keyboard Shortcuts (Kbd)</CardTitle>
			<CardDescription>Display keyboard shortcut combinations</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="space-y-4">
				<div class="clay flex items-center gap-2 p-3 rounded-md">
					<span>Copy:</span>
					<span class="clay-button min-w-[30px] text-center text-xs px-2 py-1">Ctrl</span>
					<span>+</span>
					<span class="clay-button min-w-[30px] text-center text-xs px-2 py-1">C</span>
				</div>
				<div class="clay flex items-center gap-2 p-3 rounded-md">
					<span>Save:</span>
					<span class="clay-button min-w-[30px] text-center text-xs px-2 py-1">Ctrl</span>
					<span>+</span>
					<span class="clay-button min-w-[30px] text-center text-xs px-2 py-1">S</span>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Placeholder for Theme Controller -->
	<Card>
		<CardHeader>
			<CardTitle>Theme Controller</CardTitle>
			<CardDescription>Control application theme preferences</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<div class="flex gap-4">
					<Button 
						variant={themeMode === 'light' ? 'primary' : 'secondary'} 
						onclick={() => themeMode = 'light'}
					>
						<Icon icon="mdi:white-balance-sunny" class="mr-2" />
						Light Theme
					</Button>
					<Button 
						variant={themeMode === 'dark' ? 'primary' : 'secondary'} 
						onclick={() => themeMode = 'dark'}
					>
						<Icon icon="mdi:moon-waning-crescent" class="mr-2" />
						Dark Theme
					</Button>
					<Button 
						variant={themeMode === 'system' ? 'primary' : 'secondary'} 
						onclick={() => themeMode = 'system'}
					>
						<Icon icon="mdi:desktop-mac" class="mr-2" />
						System Theme
					</Button>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Placeholder for Copy to Clipboard -->
	<Card>
		<CardHeader>
			<CardTitle>Copy to Clipboard</CardTitle>
			<CardDescription>Copy text with visual feedback</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex items-center gap-4">
				<div class="clay flex-1 rounded-lg p-3">
					<code>npm install mljr-components</code>
				</div>
				<Button variant="accent" onclick={() => alert('Copied to clipboard!')}>
					<Icon icon="mdi:content-copy" class="mr-2" />
					Copy
				</Button>
			</div>
		</CardBody>
	</Card>

	<!-- Placeholder for Language Toggle -->
	<Card>
		<CardHeader>
			<CardTitle>Language Toggle</CardTitle>
			<CardDescription>Switch between different languages</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-3">
				<Button variant="primary" class="flex items-center gap-2">
					<Icon icon="circle-flags:uk" class="size-5" />
					English
				</Button>
				<Button variant="secondary" class="flex items-center gap-2">
					<Icon icon="circle-flags:fr" class="size-5" />
					Français
				</Button>
				<Button variant="secondary" class="flex items-center gap-2">
					<Icon icon="circle-flags:es" class="size-5" />
					Español
				</Button>
				<Button variant="secondary" class="flex items-center gap-2">
					<Icon icon="circle-flags:de" class="size-5" />
					Deutsch
				</Button>
			</div>
		</CardBody>
	</Card>
</Masonry>
