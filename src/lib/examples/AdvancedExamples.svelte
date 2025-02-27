<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import Icon from '@iconify/svelte';
</script>

<h3 class="mb-6 text-xl font-bold">Advanced Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<!-- Rich Text Editor Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Rich Text Editor</CardTitle>
			<CardDescription>WYSIWYG content editing</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay flex flex-col gap-2 rounded-lg">
				<div class="flex gap-1 p-2 border-b">
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:format-bold" />
					</Button>
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:format-italic" />
					</Button>
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:format-underline" />
					</Button>
					<div class="w-px bg-gray-300 mx-1"></div>
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:format-list-bulleted" />
					</Button>
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:format-list-numbered" />
					</Button>
					<div class="w-px bg-gray-300 mx-1"></div>
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:link" />
					</Button>
					<Button variant="secondary" class="p-1 h-8 w-8">
						<Icon icon="mdi:image" />
					</Button>
				</div>
				<div class="min-h-[100px] p-3">
					<p>This is a placeholder for a <strong>rich text editor</strong> component.</p>
					<p>You would be able to format text, add links, images, and more.</p>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Video Player Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Video Player</CardTitle>
			<CardDescription>Custom video playback controls</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay flex flex-col rounded-lg overflow-hidden">
				<div class="relative bg-gray-800 aspect-video flex items-center justify-center">
					<Icon icon="mdi:play-circle" class="text-white text-5xl opacity-80" />
					<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
						<div class="flex items-center justify-between text-white">
							<div class="flex gap-2">
								<Button variant="accent" class="h-8 w-8 p-0 text-white">
									<Icon icon="mdi:play" />
								</Button>
								<div class="flex items-center">
									<span class="text-xs">0:00</span>
									<span class="text-xs mx-1">/</span>
									<span class="text-xs">3:45</span>
								</div>
							</div>
							<div class="flex gap-2">
								<Button variant="accent" class="h-8 w-8 p-0 text-white">
									<Icon icon="mdi:volume-high" />
								</Button>
								<Button variant="accent" class="h-8 w-8 p-0 text-white">
									<Icon icon="mdi:fullscreen" />
								</Button>
							</div>
						</div>
						<div class="h-1 bg-gray-600 rounded-full mt-2">
							<div class="h-full w-1/3 bg-primary rounded-full"></div>
						</div>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Color Picker Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Color Picker</CardTitle>
			<CardDescription>Advanced color selection tool</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<div class="flex gap-4">
					<div class="clay aspect-square h-20 rounded-lg" style="background-color: #4CAF50;"></div>
					<div class="flex-1 flex flex-col gap-2">
						<div class="flex items-center gap-2">
							<span class="text-sm w-10">HEX:</span>
							<div class="clay rounded px-2 py-1 text-sm flex-1">#4CAF50</div>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sm w-10">RGB:</span>
							<div class="clay rounded px-2 py-1 text-sm flex-1">rgb(76, 175, 80)</div>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sm w-10">HSL:</span>
							<div class="clay rounded px-2 py-1 text-sm flex-1">hsl(122, 39%, 49%)</div>
						</div>
					</div>
				</div>
				
				<div class="clay-card p-3 rounded-lg">
					<div class="h-4 w-full rounded-md bg-gradient-to-r from-red-500 via-green-500 to-blue-500"></div>
					<div class="mt-2 h-40 w-full rounded-md bg-gradient-to-b from-white to-black" style="background-blend-mode: overlay; background-color: #4CAF50;"></div>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Data Graph Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Data Graphs</CardTitle>
			<CardDescription>Simple premade visualization graphs</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="h-[250px] flex flex-col">
				<div class="flex-1 flex items-end gap-1 pb-4">
					<!-- Bar Chart -->
					<div class="flex-1 flex flex-col justify-end items-center">
						<div class="clay bg-primary h-[60%] w-8"></div>
						<div class="text-xs mt-1">Jan</div>
					</div>
					<div class="flex-1 flex flex-col justify-end items-center">
						<div class="clay bg-primary h-[40%] w-8"></div>
						<div class="text-xs mt-1">Feb</div>
					</div>
					<div class="flex-1 flex flex-col justify-end items-center">
						<div class="clay bg-primary h-[70%] w-8"></div>
						<div class="text-xs mt-1">Mar</div>
					</div>
					<div class="flex-1 flex flex-col justify-end items-center">
						<div class="clay bg-primary h-[45%] w-8"></div>
						<div class="text-xs mt-1">Apr</div>
					</div>
					<div class="flex-1 flex flex-col justify-end items-center">
						<div class="clay bg-primary h-[90%] w-8"></div>
						<div class="text-xs mt-1">May</div>
					</div>
					<div class="flex-1 flex flex-col justify-end items-center">
						<div class="clay bg-primary h-[65%] w-8"></div>
						<div class="text-xs mt-1">Jun</div>
					</div>
				</div>
				<div class="h-px bg-gray-300 my-4"></div>
				<div class="flex justify-between gap-4">
					<Button variant="secondary" size="sm">
						<Icon icon="mdi:chart-bar" class="mr-2" />
						Bar
					</Button>
					<Button variant="secondary" size="sm">
						<Icon icon="mdi:chart-line" class="mr-2" />
						Line
					</Button>
					<Button variant="secondary" size="sm">
						<Icon icon="mdi:chart-pie" class="mr-2" />
						Pie
					</Button>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Table of Content Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Table of Contents</CardTitle>
			<CardDescription>Auto-generated content navigation</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay rounded-lg p-4">
				<ul class="space-y-2">
					<li>
						<a href="#" class="flex items-center text-primary hover:underline">
							<span class="mr-2">1.</span>
							<span>Introduction</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center text-primary hover:underline">
							<span class="mr-2">2.</span>
							<span>Getting Started</span>
						</a>
						<ul class="ml-6 mt-1 space-y-1">
							<li>
								<a href="#" class="flex items-center text-sm text-primary hover:underline">
									<span class="mr-2">2.1.</span>
									<span>Installation</span>
								</a>
							</li>
							<li>
								<a href="#" class="flex items-center text-sm text-primary hover:underline">
									<span class="mr-2">2.2.</span>
									<span>Configuration</span>
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#" class="flex items-center text-primary hover:underline">
							<span class="mr-2">3.</span>
							<span>Advanced Usage</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center text-primary hover:underline">
							<span class="mr-2">4.</span>
							<span>API Reference</span>
						</a>
					</li>
				</ul>
			</div>
		</CardBody>
	</Card>

	<!-- PDF Viewer Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>PDF Viewer</CardTitle>
			<CardDescription>Embedded document viewer</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay flex flex-col rounded-lg overflow-hidden">
				<div class="bg-gray-100 border-b p-2 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Button variant="secondary" class="h-8 w-8 p-0">
							<Icon icon="mdi:chevron-left" />
						</Button>
						<Button variant="secondary" class="h-8 w-8 p-0">
							<Icon icon="mdi:chevron-right" />
						</Button>
						<span class="text-sm">Page 1 of 5</span>
					</div>
					<div class="flex items-center gap-2">
						<Button variant="secondary" class="h-8 w-8 p-0">
							<Icon icon="mdi:magnify-plus" />
						</Button>
						<Button variant="secondary" class="h-8 w-8 p-0">
							<Icon icon="mdi:magnify-minus" />
						</Button>
						<Button variant="secondary" class="h-8 px-2 py-0 text-sm">
							<Icon icon="mdi:download" class="mr-1" />
							Download
						</Button>
					</div>
				</div>
				<div class="bg-gray-200 p-8 flex items-center justify-center min-h-[300px]">
					<div class="clay bg-white shadow-lg w-full max-w-md aspect-[8.5/11] p-4 text-center flex flex-col justify-center">
						<h3 class="text-xl font-bold mb-2">Sample Document</h3>
						<p class="mb-4">This is a placeholder for a PDF document viewer component.</p>
						<div class="clay bg-gray-100 mx-auto w-3/4 h-4 mb-2"></div>
						<div class="clay bg-gray-100 mx-auto w-2/3 h-4 mb-2"></div>
						<div class="clay bg-gray-100 mx-auto w-4/5 h-4"></div>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Image Compare Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Image Compare</CardTitle>
			<CardDescription>Before/after image comparison</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay relative aspect-[16/9] overflow-hidden rounded-lg">
				<img 
					src="https://picsum.photos/id/1015/600/400" 
					alt="Before" 
					class="w-full h-full object-cover"
				/>
				<div class="absolute top-0 left-0 h-full w-1/2 overflow-hidden border-r-4 border-white">
					<img 
						src="https://picsum.photos/id/1016/600/400" 
						alt="After" 
						class="w-[calc(100%*2)] h-full max-w-none object-cover"
					/>
				</div>
				<div class="absolute top-0 bottom-0 left-1/2 w-1 bg-white -ml-0.5 flex items-center justify-center">
					<div class="clay bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
						<Icon icon="mdi:arrow-left-right" class="text-primary" />
					</div>
				</div>
				<div class="absolute top-4 left-4 clay bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
					Before
				</div>
				<div class="absolute top-4 right-4 clay bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
					After
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Audio Visualizer Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Audio Visualizer</CardTitle>
			<CardDescription>Sound wave visualization</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay flex flex-col gap-3 rounded-lg p-4">
				<div class="h-20 flex items-center gap-0.5">
					{#each Array(50) as _, i}
						{@const height = 10 + Math.sin(i * 0.2) * 35 + Math.random() * 10}
						<div class="bg-primary w-1.5 rounded-full" style="height: {height}%"></div>
					{/each}
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Button variant="secondary" class="h-10 w-10 p-0">
							<Icon icon="mdi:play" />
						</Button>
						<div class="flex items-center">
							<span class="text-sm">1:24</span>
							<span class="mx-1 text-sm">/</span>
							<span class="text-sm">3:45</span>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<Button variant="secondary" class="h-8 w-8 p-0">
							<Icon icon="mdi:volume-high" />
						</Button>
						<Button variant="secondary" class="h-8 w-8 p-0">
							<Icon icon="mdi:playlist-music" />
						</Button>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Map Placeholder -->
	<Card>
		<CardHeader>
			<CardTitle>Map</CardTitle>
			<CardDescription>Interactive mapping component</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay relative aspect-[16/9] overflow-hidden rounded-lg">
				<img 
					src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.3508,48.8567,12,0/600x400?access_token=example" 
					alt="Map" 
					class="w-full h-full object-cover"
				/>
				<div class="absolute top-4 right-4 flex flex-col gap-2">
					<Button variant="secondary" class="h-8 w-8 p-0">
						<Icon icon="mdi:plus" />
					</Button>
					<Button variant="secondary" class="h-8 w-8 p-0">
						<Icon icon="mdi:minus" />
					</Button>
				</div>
				<div class="absolute bottom-4 right-4">
					<Button variant="primary" size="sm">
						<Icon icon="mdi:crosshairs-gps" class="mr-1" />
						My Location
					</Button>
				</div>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div class="relative">
						<Icon icon="mdi:map-marker" class="text-error text-4xl" />
						<div class="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap clay bg-white px-2 py-0.5 rounded text-sm">
							Eiffel Tower
						</div>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>
</Masonry>