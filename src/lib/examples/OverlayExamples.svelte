<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import { AlertDialog } from '$lib/alert-dialog/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import ComboBox from '$lib/ComboBox.svelte';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogTitle,
		DialogDescription,
		DialogClose
	} from '$lib/dialog/index.js';
	import { Tooltip, Button } from '$lib/index.js';
	import Icon from '@iconify/svelte';
	import { Popover } from '$lib/popover/index.js';

	async function handleDelete() {
		// Simulate async operation
		await new Promise((resolve) => setTimeout(resolve, 1000));
		alert('Account deleted successfully!');
	}

	// Add ComboBox demo data
	const technologies = [
		{ value: 'svelte', label: 'Svelte', icon: 'logos:svelte-icon' },
		{ value: 'react', label: 'React', icon: 'logos:react' },
		{ value: 'vue', label: 'Vue', icon: 'logos:vue' },
		{ value: 'angular', label: 'Angular', icon: 'logos:angular-icon' },
		{ value: 'solid', label: 'SolidJS', icon: 'logos:solidjs-icon' },
		{ value: 'astro', label: 'Astro', icon: 'logos:astro-icon' },
		{ value: 'nextjs', label: 'Next.js', icon: 'logos:nextjs-icon' },
		{ value: 'nuxt', label: 'Nuxt', icon: 'logos:nuxt-icon' }
	];

	let selectedTech = $state('');
</script>

<h3 class="mb-6 text-xl font-bold">Overlay & Popup Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<Card>
		<CardHeader>
			<CardTitle>Alert Dialog</CardTitle>
			<CardDescription>Modal dialog for important messages</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<AlertDialog
					variant="error"
					triggerText="Delete Account"
					actionText="Delete"
					onAction={handleDelete}
					cardVariant="warning"
				>
					{#snippet title()}
						Delete Account
					{/snippet}
					{#snippet description()}
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					{/snippet}
				</AlertDialog>

				<AlertDialog
					variant="primary"
					triggerText="Show Info"
					actionText="Got it"
					cardVariant="primary"
					cancelVariant="secondary"
				>
					{#snippet title()}
						Important Information
					{/snippet}
					{#snippet description()}
						This is an example of an informative alert dialog with a primary color scheme.
					{/snippet}
				</AlertDialog>

				<AlertDialog
					variant="info"
					triggerText="No Buttons Example"
					showButtons={false}
					cardVariant="accent"
				>
					{#snippet title()}
						Notification Only
					{/snippet}
					{#snippet description()}
						This is an example of an alert dialog without buttons. Click outside to close.
					{/snippet}
				</AlertDialog>

				<AlertDialog
					variant="success"
					triggerText="Success Dialog"
					actionText="Complete"
					cardVariant="success"
					cancelVariant="error"
				>
					{#snippet title()}
						Operation Successful
					{/snippet}
					{#snippet description()}
						Your changes have been saved successfully.
					{/snippet}
				</AlertDialog>

				<AlertDialog variant="info" triggerText="Info Dialog" actionText="OK" cardVariant="info">
					{#snippet title()}
						System Update
					{/snippet}
					{#snippet description()}
						The system will be updated in the next 24 hours.
					{/snippet}
				</AlertDialog>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Combobox</CardTitle>
			<CardDescription>Searchable dropdown selection</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<ComboBox
					items={technologies}
					placeholder="Select a framework..."
					icon="mdi:web"
					variant="primary"
					type="single"
				/>

				<ComboBox
					items={technologies}
					variant="accent"
					placeholder="No icon version"
					type="multiple"
				/>

				<ComboBox
					items={technologies}
					variant="info"
					icon="mdi:information"
					placeholder="Info variant..."
					type="single"
				/>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Dialog</CardTitle>
			<CardDescription>Modal dialog component</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<!-- Basic Dialog -->
				<Dialog variant="primary" triggerText="Basic Dialog">
					<DialogContent>
						<DialogTitle>Basic Dialog</DialogTitle>
						<DialogDescription>
							This is a basic dialog with a title and description.
						</DialogDescription>
						<DialogFooter>
							<DialogClose variant="secondary">Close</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<!-- Custom Content Dialog -->
				<Dialog variant="accent" triggerText="Custom Content">
					<DialogContent>
						<DialogTitle>Custom Form</DialogTitle>
						<form class="space-y-4">
							<input type="text" placeholder="Name" class="w-full rounded border p-2" />
							<textarea placeholder="Message" class="w-full rounded border p-2"></textarea>
						</form>
						<DialogFooter>
							<DialogClose variant="error">Cancel</DialogClose>
							<DialogClose variant="success">Submit</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<!-- Large Dialog -->
				<Dialog variant="info" triggerText="Large Dialog">
					<DialogContent class="max-w-2xl">
						<DialogTitle>Terms of Service</DialogTitle>
						<div class="my-4 max-h-[60vh] overflow-auto">
							<p>Lorem ipsum dolor sit amet...</p>
						</div>
						<DialogFooter>
							<DialogClose variant="primary">Accept</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</CardBody>
	</Card>

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

				<Tooltip variant="success">
					{#snippet trigger()}
						<Button variant="success">
							<Icon icon="mdi:check" />
						</Button>
					{/snippet}
					Task completed
				</Tooltip>

				<Tooltip variant="error">
					{#snippet trigger()}
						<Button variant="error">
							<Icon icon="mdi:alert" />
						</Button>
					{/snippet}
					Important warning
				</Tooltip>

				<!-- With Custom Delay -->
				<Tooltip variant="info" delayDuration={1000}>
					{#snippet trigger()}
						<Button variant="info">Hover 1s</Button>
					{/snippet}
					Delayed tooltip
				</Tooltip>

				<!-- With Rich Content -->
				<Tooltip variant="muted">
					{#snippet trigger()}
						<Button variant="muted">
							<Icon icon="mdi:settings" />
						</Button>
					{/snippet}
					<div class="flex items-center gap-2">
						<Icon icon="mdi:cog" class="size-4" />
						<span>Configure settings</span>
					</div>
				</Tooltip>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Popover</CardTitle>
			<CardDescription>Floating content overlay</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<!-- Basic Popover -->
				<Popover variant="primary">
					{#snippet trigger()}
						<Button variant="primary">
							<Icon icon="mdi:information" />
						</Button>
					{/snippet}
					<div class="p-4">
						<h4 class="font-semibold">Basic Popover</h4>
						<p class="text-sm">This is a basic popover example.</p>
					</div>
				</Popover>

				<!-- Different Variants -->
				<Popover variant="accent">
					{#snippet trigger()}
						<Button variant="accent">Settings</Button>
					{/snippet}
					<div class="p-4">
						<h4 class="font-semibold">Settings</h4>
						<p class="text-sm">Configure your preferences here.</p>
					</div>
				</Popover>

				<!-- Rich Content -->
				<Popover variant="info">
					{#snippet trigger()}
						<Button variant="info">Profile</Button>
					{/snippet}
					<div class="p-4">
						<div class="flex items-center gap-3">
							<div class="rounded-full bg-muted p-2">
								<Icon icon="mdi:user" class="size-6" />
							</div>
							<div>
								<h4 class="font-semibold">John Doe</h4>
								<p class="text-sm text-muted-foreground">john@example.com</p>
							</div>
						</div>
					</div>
				</Popover>
			</div>
		</CardBody>
	</Card>
</Masonry>
