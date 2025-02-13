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
	<div class="w-full max-w-4xl space-y-8">
		<Tab value="input" class="w-full">
			{#snippet triggers()}
				<TabTrigger value="input">Input & Form</TabTrigger>
				<TabTrigger value="navigation">Navigation & Menus</TabTrigger>
				<TabTrigger value="display">Display & Feedback</TabTrigger>
				<TabTrigger value="layout">Layout & Structure</TabTrigger>
				<TabTrigger value="overlay">Overlay & Popups</TabTrigger>
			{/snippet}

			{#snippet content()}
				<TabContent value="input">
					<div class="grid gap-4 md:grid-cols-2">
						<h3 class="col-span-full text-xl font-bold">Input & Form Components</h3>
						
						<!-- Button Showcase -->
                        <div class="col-span-full space-y-8">
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold">Button Variants</h4>
                                <div class="flex flex-wrap gap-4">
                                    <Button>Primary Button</Button>
                                    <Button variant="secondary">Secondary Button</Button>
                                    <Button variant="tertiary">Tertiary Button</Button>
                                    <Button variant="accent">Accent Button</Button>
                                    <Button variant="muted">Muted Button</Button>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold">State Buttons</h4>
                                <div class="flex flex-wrap gap-4">
                                    <Button variant="success">Success Button</Button>
                                    <Button variant="error">Error Button</Button>
                                    <Button variant="warning">Warning Button</Button>
                                    <Button variant="info">Info Button</Button>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold">Button States</h4>
                                <div class="flex flex-wrap gap-4">
                                    <Button>Active Button</Button>
                                    <Button active={false}>Disabled Button</Button>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold">Buttons with Click Events</h4>
                                <div class="flex flex-wrap gap-4">
                                    <Button onclick={() => alert('Clicked!')}>Click Me</Button>
                                </div>
                            </div>
                        </div>

						<!-- Rest of the components -->
						<div class="space-y-2">
							<p>• Checkbox</p>
							<p>• Date Field</p>
							<p>• Date Picker</p>
							<p>• Date Range Field</p>
							<p>• Date Range Picker</p>
							<p>• PIN Input</p>
							<p>• Radio Group</p>
							<p>• Slider</p>
						</div>
					</div>
				</TabContent>

				<TabContent value="navigation">
					<div class="grid gap-4 md:grid-cols-2">
						<h3 class="col-span-full text-xl font-bold">Navigation & Menu Components</h3>
						<div class="space-y-2">
							<p>• Command</p>
							<p>• Context Menu</p>
							<p>• Dropdown Menu</p>
							<p>• Menubar</p>
							<p>• Navigation Menu</p>
							<p>• Pagination</p>
							<p>• Toolbar</p>
						</div>
					</div>
				</TabContent>

				<TabContent value="display">
					<div class="grid gap-4 md:grid-cols-2">
						<h3 class="col-span-full text-xl font-bold">Display & Feedback Components</h3>
						<div class="space-y-2">
							<p>• Avatar</p>
							<p>• Label</p>
							<p>• Link Preview</p>
							<p>• Progress</p>
							<p>• Separator</p>
							<p>• Switch</p>
							<p>• Toggle</p>
						</div>
					</div>
				</TabContent>

				<TabContent value="layout">
					<div class="grid gap-4 md:grid-cols-2">
						<h3 class="col-span-full text-xl font-bold">Layout & Structure Components</h3>
						<div class="space-y-2">
							<p>• Accordion</p>
							<p>• Aspect Ratio</p>
							<p>• Collapsible</p>
							<p>• Scroll Area</p>
							<p>• Tabs</p>
							<p>• Toggle Group</p>
						</div>
					</div>
				</TabContent>

				<TabContent value="overlay">
					<div class="grid gap-4 md:grid-cols-2">
						<h3 class="col-span-full text-xl font-bold">Overlay & Popup Components</h3>
						<div class="space-y-2">
							<p>• Alert Dialog</p>
							<p>• Calendar</p>
							<p>• Combobox</p>
							<p>• Dialog</p>
							<p>• Popover</p>
							<p>• Range Calendar</p>
							<p>• Select</p>
							<p>• Tooltip</p>
						</div>
					</div>
				</TabContent>
			{/snippet}
		</Tab>
	</div>
</div>
