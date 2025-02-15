<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import {
		ContextMenu,
		ContextMenuContent,
		ContextMenuItem,
		ContextMenuTrigger,
		ContextMenuSeparator
	} from '$lib/contextMenu/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator
	} from '$lib/dropdown-menu/index.js';
	import { Checkbox } from '$lib/checkbox/index.js';
	import Icon from '@iconify/svelte';

	let notifications = $state(false);
	let markAsRead = $state(false);
	let selected = $state('');

	const users = [
		{ label: '@huntabyte', value: 'hunt', avatar: 'https://github.com/huntabyte.png' },
		{ label: '@opensourceguy', value: 'open', avatar: 'https://github.com/pavelstianko.png' },
		{ label: '@cokakoala', value: 'coka', avatar: 'https://github.com/adriangonz97.png' }
	];

	const shortcuts = [
		{ label: 'Profile', value: 'profile', icon: 'mdi:user', shortcut: '⌘P' },
		{ label: 'Settings', value: 'settings', icon: 'mdi:cog', shortcut: '⌘,' },
		{ label: 'Messages', value: 'messages', icon: 'mdi:message', shortcut: '⌘M' },
		{ label: 'Files', value: 'files', icon: 'mdi:folder', shortcut: '⌘F' }
	];
</script>

<h3 class="mb-6 text-xl font-bold">Navigation & Menu Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<Card>
		<CardHeader>
			<CardTitle>Command</CardTitle>
			<CardDescription>Command palette interface</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Context Menu</CardTitle>
			<CardDescription>Right-click menu interface</CardDescription>
		</CardHeader>
		<CardBody>
			<ContextMenu>
				<ContextMenuTrigger>
					<div
						class="clay bg-base-200 flex h-[150px] w-full items-center justify-center rounded-xl select-none"
					>
						<div class="flex flex-col items-center justify-center gap-4 text-center">
							<Icon icon="mdi:mouse" class="size-8" />
							Right click here
						</div>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent variant="accent">
					<ContextMenuItem icon="mdi:pencil" shortcut="⌘E">Edit</ContextMenuItem>
					<ContextMenuItem icon="mdi:content-copy" shortcut="⌘C">Copy</ContextMenuItem>
					<ContextMenuItem icon="mdi:content-cut" shortcut="⌘X">Cut</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem icon="mdi:trash" shortcut="⌘⌫">Delete</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem icon="mdi:share" disabled>Share</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Dropdown Menu</CardTitle>
			<CardDescription>Contextual dropdown interface</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-wrap gap-4">
				<!-- Basic Dropdown -->
				<DropdownMenu variant="primary" label="Menu" icon="mdi:menu">
					<DropdownMenuContent>
						{#each shortcuts as item}
							<DropdownMenuItem {...item} />
						{/each}
					</DropdownMenuContent>
				</DropdownMenu>

				<!-- User Menu - Modified to use regular Checkbox -->
				<DropdownMenu variant="info">
					{#snippet trigger()}
						<img
							src="https://github.com/huntabyte.png"
							alt="@huntabyte"
							class="border-info size-10 rounded-full border-2"
						/>
					{/snippet}
					<DropdownMenuContent>
						<div class="mb-2 px-2 py-1.5 text-sm font-medium">
							<div class="font-bold">Huntabyte</div>
							<div class="text-xs opacity-70">admin@huntabyte.com</div>
						</div>
						<DropdownMenuSeparator />
						{#each shortcuts as item}
							<DropdownMenuItem {...item} />
						{/each}
						<DropdownMenuSeparator />
						<div class="flex items-center gap-2 p-2">
							<Checkbox bind:checked={notifications} variant="info" />
							<span class="flex items-center gap-2 text-sm">
								<Icon icon="mdi:bell" class="size-5" />
								Notifications
							</span>
						</div>
						<div class="flex items-center gap-2 p-2">
							<Checkbox bind:checked={markAsRead} variant="info" />
							<span class="flex items-center gap-2 text-sm">
								<Icon icon="mdi:check-all" class="size-5" />
								Auto Mark as Read
							</span>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>

				<!-- Switch Account -->
				<DropdownMenu variant="accent" label="Switch Account" icon="mdi:account-switch">
					<DropdownMenuContent>
						<div class="mb-2 px-2 py-1.5 text-sm opacity-70">Switch Account</div>
						<DropdownMenuSeparator />
						{#each users as user}
							<DropdownMenuItem label={user.label} class="py-1">
								<img src={user.avatar} alt={user.label} class="mr-2 size-6 rounded-full" />
							</DropdownMenuItem>
						{/each}
						<DropdownMenuSeparator />
						<DropdownMenuItem label="Add Account" icon="mdi:account-plus" variant="success" />
						<DropdownMenuItem label="Logout" icon="mdi:logout" variant="error" />
					</DropdownMenuContent>
				</DropdownMenu>

				<!-- Settings Menu - Modified to use regular Checkbox -->
				<DropdownMenu variant="secondary" icon="mdi:cog">
					<DropdownMenuContent class="w-56">
						<DropdownMenuItem label="View Settings" icon="mdi:eye" shortcut="⌘V" />
						<DropdownMenuItem label="Theme Settings" icon="mdi:palette" shortcut="⌘T" />
						<DropdownMenuSeparator />
						<div class="flex items-center gap-2 p-2">
							<Checkbox bind:checked={notifications} variant="secondary" />
							<span class="flex items-center gap-2 text-sm">
								<Icon icon="mdi:bell" class="size-5" />
								Show notifications
							</span>
						</div>
						<DropdownMenuItem label="Advanced Settings" icon="mdi:tune" disabled />
					</DropdownMenuContent>
				</DropdownMenu>

				<!-- Variant Showcase -->
				{#each ['primary', 'secondary', 'tertiary', 'accent', 'muted', 'error', 'success', 'warning', 'info'] as Variant[] as variant}
					<DropdownMenu {variant} label={variant}>
						<DropdownMenuContent {variant}>
							<DropdownMenuItem {variant} label="Item 1" icon="mdi:check" />
							<DropdownMenuItem {variant} label="Item 2" icon="mdi:star" />
							<DropdownMenuSeparator />
							<DropdownMenuItem {variant} label="Item 3" icon="mdi:heart" />
						</DropdownMenuContent>
					</DropdownMenu>
				{/each}
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Menubar</CardTitle>
			<CardDescription>Horizontal menu system</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Navigation Menu</CardTitle>
			<CardDescription>Hierarchical navigation component</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Pagination</CardTitle>
			<CardDescription>Page navigation controls</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Toolbar</CardTitle>
			<CardDescription>Tool container component</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>
</Masonry>
