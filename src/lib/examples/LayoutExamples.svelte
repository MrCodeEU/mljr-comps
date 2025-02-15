<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import { Accordion, AccordionItem } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import { AspectRatio } from '$lib/index.js';
	import Icon from '@iconify/svelte';
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '$lib/index.js';
	import { Tab, TabTrigger, TabContent } from '$lib/index.js';
	import { ScrollArea } from '$lib/index.js';

	let notificationCount = $state(3);
</script>

<h3 class="mb-6 text-xl font-bold">Layout & Structure Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<Card>
		<CardHeader>
			<CardTitle>Accordion</CardTitle>
			<CardDescription>Collapsible content sections</CardDescription>
		</CardHeader>
		<CardBody>
			<Accordion type="single" class="mx-auto max-w-md">
				{#snippet triggers()}
					<AccordionItem value="clay" variant="primary">
						{#snippet title()}
							<span class="font-semibold">What is Claymorphism?</span>
						{/snippet}
						{#snippet content()}
							<div class="prose dark:prose-invert">
								<p>
									Claymorphism is a design style that makes elements look like they're made of clay,
									with:
								</p>
								<ul>
									<li>Soft shadows</li>
									<li>Rounded corners</li>
									<li>Subtle depth effects</li>
								</ul>
							</div>
						{/snippet}
					</AccordionItem>
					<AccordionItem value="usage" variant="accent">
						{#snippet title()}
							<span class="font-semibold">How to use the Accordion?</span>
						{/snippet}
						{#snippet content()}
							<div class="prose dark:prose-invert">
								<pre><code
										>{`<Accordion type="single">
    {#snippet triggers()}
        <AccordionItem 
            value="example"
            variant="primary">
            {#snippet title()}
                Title Here
            {/snippet}
            {#snippet content()}
                Content Here
            {/snippet}
        </AccordionItem>
    {/snippet}
</Accordion>`}</code
									></pre>
							</div>
						{/snippet}
					</AccordionItem>
					<AccordionItem value="variants" variant="info">
						{#snippet title()}
							<span class="font-semibold">Available Variants</span>
						{/snippet}
						{#snippet content()}
							<div class="grid gap-2">
								<div>primary (default)</div>
								<div>secondary</div>
								<div>accent</div>
								<div>info</div>
								<div>error</div>
								<div>warning</div>
								<div>success</div>
								<div>muted</div>
							</div>
						{/snippet}
					</AccordionItem>
				{/snippet}
			</Accordion>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Aspect Ratio</CardTitle>
			<CardDescription>Maintains content proportions</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="grid gap-4">
				<AspectRatio ratio={16 / 9} class="clay overflow-hidden">
					<img
						src="https://picsum.photos/1600/900"
						alt="Random"
						class="absolute h-full w-full object-cover"
					/>
					<div class="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
						16:9 Ratio
					</div>
				</AspectRatio>

				<AspectRatio ratio={4 / 3} class="clay overflow-hidden">
					<img
						src="https://picsum.photos/800/600"
						alt="Random"
						class="absolute h-full w-full object-cover"
					/>
					<div class="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
						4:3 Ratio
					</div>
				</AspectRatio>

				<AspectRatio ratio={1} class="clay overflow-hidden">
					<img
						src="https://picsum.photos/500/500"
						alt="Random"
						class="absolute h-full w-full object-cover"
					/>
					<div class="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
						1:1 Ratio
					</div>
				</AspectRatio>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Collapsible</CardTitle>
			<CardDescription>Flexible and customizable expandable sections</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="grid gap-4">
				<!-- Notification Style -->
				<Collapsible variant="info" class="mx-auto max-w-md">
					{#snippet trigger()}
						<CollapsibleTrigger class="!bg-transparent">
							<div class="flex items-center gap-3">
								<div class="relative">
									<Icon icon="heroicons:bell" class="h-6 w-6" />
									{#if notificationCount > 0}
										<div
											class="bg-error absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
										>
											{notificationCount}
										</div>
									{/if}
								</div>
								<span class="font-semibold">Notifications</span>
							</div>
						</CollapsibleTrigger>
					{/snippet}
					{#snippet content()}
						<CollapsibleContent>
							<div class="space-y-2">
								<div class="bg-info/10 flex items-center justify-between rounded p-3">
									<span>New message from Alice</span>
									<button class="clay-button" onclick={() => notificationCount--}>
										<Icon icon="heroicons:check" class="h-4 w-4" />
									</button>
								</div>
								<div class="bg-info/10 flex items-center justify-between rounded p-3">
									<span>Bob mentioned you</span>
									<button class="clay-button" onclick={() => notificationCount--}>
										<Icon icon="heroicons:check" class="h-4 w-4" />
									</button>
								</div>
								<div class="bg-info/10 flex items-center justify-between rounded p-3">
									<span>Meeting reminder</span>
									<button class="clay-button" onclick={() => notificationCount--}>
										<Icon icon="heroicons:check" class="h-4 w-4" />
									</button>
								</div>
							</div>
						</CollapsibleContent>
					{/snippet}
				</Collapsible>

				<!-- Card Style -->
				<Collapsible variant="accent" class="mx-auto max-w-md">
					{#snippet trigger()}
						<CollapsibleTrigger class="!p-0">
							<div class="group relative overflow-hidden rounded-lg">
								<img
									src="https://picsum.photos/800/400"
									alt="Random"
									class="aspect-video w-full object-cover transition-transform group-hover:scale-105"
								/>
								<div
									class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white"
								>
									<div class="flex-1">
										<h3 class="text-lg font-bold">Featured Content</h3>
										<p class="text-sm opacity-90">Click to expand for details</p>
									</div>
									<Icon
										icon="heroicons:chevron-down"
										class="h-6 w-6 transition-transform group-data-[state=open]:rotate-180"
									/>
								</div>
							</div>
						</CollapsibleTrigger>
					{/snippet}
					{#snippet content()}
						<CollapsibleContent>
							<div class="prose dark:prose-invert">
								<p>This example shows how flexible the Collapsible component can be. You can:</p>
								<ul>
									<li>Use custom trigger layouts</li>
									<li>Add images and overlays</li>
									<li>Include interactive elements</li>
									<li>Style with hover effects</li>
								</ul>
								<div class="flex justify-end">
									<button class="clay-button variant-filled-accent">Learn More →</button>
								</div>
							</div>
						</CollapsibleContent>
					{/snippet}
				</Collapsible>

				<!-- Chat Style -->
				<Collapsible variant="primary" class="mx-auto max-w-md">
					{#snippet trigger()}
						<CollapsibleTrigger class="!bg-primary/10">
							<div class="flex items-center gap-3">
								<div class="relative h-10 w-10">
									<img
										src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
										alt="Avatar"
										class="rounded-full"
									/>
									<div
										class="bg-success absolute right-0 bottom-0 h-3 w-3 rounded-full ring-2 ring-white"
									></div>
								</div>
								<div class="flex-1 text-left">
									<div class="font-semibold">Chat Support</div>
									<div class="text-sm opacity-70">Online - Click to expand</div>
								</div>
								<div
									class="bg-success flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
								>
									2
								</div>
							</div>
						</CollapsibleTrigger>
					{/snippet}
					{#snippet content()}
						<CollapsibleContent>
							<div class="space-y-4 p-4">
								<div class="flex gap-2">
									<div class="h-8 w-8">
										<img
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
											alt="Avatar"
											class="rounded-full"
										/>
									</div>
									<div class="clay bg-primary/10 max-w-[80%] rounded-lg rounded-tl-none p-3">
										Hello! How can I help you today?
									</div>
								</div>
								<div class="flex flex-row-reverse gap-2">
									<div class="h-8 w-8">
										<img
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
											alt="User"
											class="rounded-full"
										/>
									</div>
									<div
										class="clay bg-primary max-w-[80%] rounded-lg rounded-tr-none p-3 text-white"
									>
										I have a question about the Collapsible component.
									</div>
								</div>
							</div>
						</CollapsibleContent>
					{/snippet}
				</Collapsible>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Scroll Area</CardTitle>
			<CardDescription>Custom scrollable container with variants</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="grid gap-6">
				<!-- Primary Variant -->
				<div>
					<h4 class="mb-2 font-semibold">Primary Variant</h4>
					<ScrollArea class="h-[200px] w-full max-w-md" variant="primary">
						<div class="space-y-4">
							{#each Array(8) as _, i}
								<div class="clay bg-primary/5 p-4">
									<h5 class="text-primary font-semibold">Section {i + 1}</h5>
									<p class="text-sm">Primary variant example with clay styling.</p>
								</div>
							{/each}
						</div>
					</ScrollArea>
				</div>

				<!-- Success Variant with Horizontal Scroll -->
				<div>
					<h4 class="mb-2 font-semibold">Success Variant (Horizontal)</h4>
					<ScrollArea
						orientation="horizontal"
						variant="success"
						class="h-[150px] w-full max-w-[550px]"
					>
						<div class="flex gap-4">
							<!-- Removed w-fit -->
							{#each Array(8) as _, i}
								<div class="clay bg-success/5 h-[120px] w-[200px] shrink-0 p-4">
									<h5 class="text-success font-semibold">Card {i + 1}</h5>
									<p class="text-sm">Success variant with horizontal scroll.</p>
								</div>
							{/each}
						</div>
					</ScrollArea>
				</div>

				<!-- Info Variant with Both Scrollbars -->
				<div>
					<h4 class="mb-2 font-semibold">Info Variant (Both)</h4>
					<ScrollArea orientation="both" variant="info" class="h-[400px] w-full max-w-[500px]">
						<div class="grid h-[600px] w-[800px] grid-cols-3 gap-4">
							<!-- Removed wrapper div -->
							{#each Array(15) as _, i}
								<div class="clay bg-info/5 flex aspect-square items-center justify-center">
									<div class="text-center">
										<h5 class="text-info font-semibold">Item {i + 1}</h5>
										<p class="text-sm">Info variant example.</p>
									</div>
								</div>
							{/each}
						</div>
					</ScrollArea>
				</div>

				<!-- Accent Variant with Auto Type -->
				<div>
					<h4 class="mb-2 font-semibold">Accent Variant (Auto Type)</h4>
					<ScrollArea type="auto" variant="accent" class="h-[200px] w-full max-w-md">
						<div class="space-y-4">
							{#each Array(8) as _, i}
								<div class="clay bg-accent/5 p-4">
									<h5 class="text-accent font-semibold">Section {i + 1}</h5>
									<p class="text-sm">Accent variant with auto-visible scrollbar.</p>
								</div>
							{/each}
						</div>
					</ScrollArea>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Tabs</CardTitle>
			<CardDescription>Tabbed interface component</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="grid gap-8">
				<!-- Basic Tabs Example -->
				<Tab value="features" class="w-full">
					{#snippet triggers()}
						<TabTrigger value="features" variant="primary">Features</TabTrigger>
						<TabTrigger value="specs" variant="primary">Specifications</TabTrigger>
						<TabTrigger value="reviews" variant="primary">Reviews</TabTrigger>
					{/snippet}

					{#snippet content()}
						<TabContent value="features" class="bg-primary/10">
							<div class="prose dark:prose-invert">
								<h4>Key Features</h4>
								<ul>
									<li>Smooth transitions</li>
									<li>Accessible keyboard navigation</li>
									<li>Customizable styling</li>
									<li>Responsive design</li>
								</ul>
							</div>
						</TabContent>

						<TabContent value="specs" class="bg-primary/10">
							<div class="prose dark:prose-invert">
								<h4>Technical Specifications</h4>
								<ul>
									<li>Built with Bits UI</li>
									<li>TypeScript support</li>
									<li>ARIA compliant</li>
									<li>Zero dependencies</li>
								</ul>
							</div>
						</TabContent>

						<TabContent value="reviews" class="bg-primary/10">
							<div class="space-y-4">
								<div class="flex items-center gap-4">
									<div class="h-10 w-10">
										<img
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
											alt="Avatar"
											class="rounded-full"
										/>
									</div>
									<div>
										<div class="font-semibold">Alice</div>
										<div class="text-sm">⭐⭐⭐⭐⭐ Great component!</div>
									</div>
								</div>
								<div class="flex items-center gap-4">
									<div class="h-10 w-10">
										<img
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
											alt="Avatar"
											class="rounded-full"
										/>
									</div>
									<div>
										<div class="font-semibold">Bob</div>
										<div class="text-sm">⭐⭐⭐⭐ Easy to use!</div>
									</div>
								</div>
							</div>
						</TabContent>
					{/snippet}
				</Tab>

				<!-- Colorful Tabs Example -->
				<Tab value="spring" class="w-full">
					{#snippet triggers()}
						<TabTrigger value="spring" variant="success">Spring</TabTrigger>
						<TabTrigger value="summer" variant="warning">Summer</TabTrigger>
						<TabTrigger value="autumn" variant="error">Autumn</TabTrigger>
						<TabTrigger value="winter" variant="info">Winter</TabTrigger>
					{/snippet}

					{#snippet content()}
						<TabContent value="spring" class="bg-success/10">
							<div class="flex items-center gap-4">
								<Icon icon="ph:flower-lotus-bold" class="h-12 w-12" />
								<div>
									<h4 class="text-lg font-bold">Spring Collection</h4>
									<p>Fresh and vibrant designs for the season of renewal.</p>
								</div>
							</div>
						</TabContent>

						<TabContent value="summer" class="bg-warning/10">
							<div class="flex items-center gap-4">
								<Icon icon="ph:sun-bold" class="h-12 w-12" />
								<div>
									<h4 class="text-lg font-bold">Summer Collection</h4>
									<p>Bright and energetic styles for warm sunny days.</p>
								</div>
							</div>
						</TabContent>

						<TabContent value="autumn" class="bg-error/10">
							<div class="flex items-center gap-4">
								<Icon icon="ph:leaf-bold" class="h-12 w-12" />
								<div>
									<h4 class="text-lg font-bold">Autumn Collection</h4>
									<p>Warm and cozy designs for the falling leaves.</p>
								</div>
							</div>
						</TabContent>

						<TabContent value="winter" class="bg-info/10">
							<div class="flex items-center gap-4">
								<Icon icon="ph:snowflake-bold" class="h-12 w-12" />
								<div>
									<h4 class="text-lg font-bold">Winter Collection</h4>
									<p>Cool and sophisticated styles for the snowy season.</p>
								</div>
							</div>
						</TabContent>
					{/snippet}
				</Tab>
			</div>
		</CardBody>
	</Card>
</Masonry>
