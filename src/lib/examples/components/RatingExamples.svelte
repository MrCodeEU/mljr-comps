<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import { Rating } from '$lib/rating/index.js';
	import Masonry from '$lib/Masonry.svelte';

	// Example ratings for different use cases
	let basicRating = 3;
	let halfStarRating = 3.5;
	let customIconRating = 4;
	let readonlyRating = 4.5;
	let productRating = 4.2;
	let preciseRating = 2.7;

	// Store for multiple product ratings
	const products = [
		{ name: 'Ergonomic Chair', rating: 4.8, reviews: 182 },
		{ name: 'Mechanical Keyboard', rating: 3.5, reviews: 85 },
		{ name: 'Wireless Headphones', rating: 4.2, reviews: 237 },
		{ name: 'Coffee Maker', rating: 2.7, reviews: 45 },
		{ name: 'Travel Backpack', rating: 5.0, reviews: 72 }
	];
</script>

<h3 class="mb-6 text-xl font-bold">Rating Component</h3>
<Card>
	<CardHeader>
		<CardTitle>Basic Rating</CardTitle>
		<CardDescription>Interactive rating component with claymorphism design</CardDescription>
	</CardHeader>
	<CardBody class="space-y-8">
		<!-- Basic Examples -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Basic Rating</h4>
			<div class="grid gap-6">
				<div>
					<Rating bind:value={basicRating} label="Rate this product" showValue={true} />
					<p class="text-foreground/70 mt-2 text-sm">Selected rating: {basicRating}</p>
				</div>

				<div>
					<Rating value={4} interactive={false} label="Average user rating" showValue={true} />
					<p class="text-foreground/70 mt-2 text-sm">Based on 128 reviews</p>
				</div>
			</div>
		</div>

		<!-- Half Star Examples -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Half-Star Rating</h4>
			<div class="grid gap-6">
				<div>
					<Rating
						bind:value={halfStarRating}
						precision={0.5}
						label="Rate with half-stars"
						showValue={true}
					/>
					<p class="text-foreground/70 mt-2 text-sm">Selected rating: {halfStarRating}</p>
				</div>
				<div>
					<Rating value={3.5} interactive={false} precision={0.5} label="Product rating" />
					<p class="text-foreground/70 mt-2 text-sm">Based on expert review</p>
				</div>
			</div>
		</div>

		<!-- Size Variants -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Size Variants</h4>
			<div class="grid gap-6">
				<Rating value={4} size="sm" label="Small rating" />
				<Rating value={4} size="md" label="Medium rating" />
				<Rating value={4} size="lg" label="Large rating" />
			</div>
		</div>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Custom Rating Icons</CardTitle>
		<CardDescription>Use any Iconify icon for ratings</CardDescription>
	</CardHeader>
	<CardBody class="space-y-8">
		<!-- Custom Icon Examples -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Custom Icons</h4>
			<div class="grid gap-6">
				<Rating
					bind:value={customIconRating}
					icon="mdi:heart"
					emptyIcon="mdi:heart-outline"
					halfIcon="mdi:heart-half-full"
					variant="error"
					label="Rate with hearts"
				/>

				<Rating
					value={4}
					icon="mdi:thumb-up"
					emptyIcon="mdi:thumb-up-outline"
					variant="success"
					max={5}
					label="Thumbs rating"
				/>

				<Rating
					value={3}
					icon="game-icons:trophy-cup"
					emptyIcon="game-icons:trophy-cup"
					variant="warning"
					max={3}
					label="Trophy rating"
					class="opacity-80 [&_.text-warning_svg]:grayscale-0 [&_svg]:grayscale-[80%]"
				/>
			</div>
		</div>

		<!-- Brand Review Examples -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Brand Review</h4>
			<div class="grid gap-6">
				<Rating
					value={4.5}
					interactive={false}
					icon="ri:amazon-fill"
					emptyIcon="ri:amazon-line"
					halfIcon="ri:amazon-fill"
					precision={0.5}
					variant="tertiary"
					label="Amazon Rating"
					showValue={true}
				/>

				<Rating
					value={3.8}
					interactive={false}
					icon="mdi:netflix"
					emptyIcon="mdi:netflix"
					precision={0.1}
					variant="error"
					label="Netflix Rating"
					showValue={true}
					class="opacity-80 [&_.text-error_svg]:grayscale-0 [&_svg]:grayscale-[80%]"
				/>
			</div>
		</div>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Product Ratings</CardTitle>
		<CardDescription>Example usage in product review contexts</CardDescription>
	</CardHeader>
	<CardBody class="space-y-8">
		<!-- Product Review Examples -->
		<div class="space-y-6">
			{#each products as product}
				<div class="clay rounded-md p-4">
					<h4 class="font-medium">{product.name}</h4>
					<div class="my-2 flex items-center gap-2">
						<Rating
							value={product.rating}
							precision={0.1}
							interactive={false}
							variant={product.rating >= 4 ? 'success' : product.rating >= 3 ? 'warning' : 'error'}
							showValue={true}
							size="sm"
						/>
						<span class="text-foreground/70 text-xs">({product.reviews} reviews)</span>
					</div>
					<div class="mt-4 flex justify-end">
						<button class="text-accent text-sm hover:underline">Read Reviews</button>
					</div>
				</div>
			{/each}
		</div>

		<!-- User Reviews Form Example -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Submit Your Review</h4>
			<div class="clay-inset space-y-4 rounded-md p-4">
				<div class="space-y-2">
					<label class="text-sm font-medium">Your Rating</label>
					<Rating bind:value={preciseRating} precision={0.5} size="lg" variant="accent" />
				</div>
				<textarea
					class="clay-inset h-24 w-full rounded-md p-2"
					placeholder="Write your review here..."
				></textarea>
				<button class="clay bg-accent hover:clay-inset rounded-md px-4 py-2">Submit Review</button>
			</div>
		</div>
	</CardBody>
</Card>

<Card>
	<CardHeader>
		<CardTitle>Rating Component Variants</CardTitle>
		<CardDescription>Different styling options for the rating component</CardDescription>
	</CardHeader>
	<CardBody class="space-y-8">
		<!-- Color Variants -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">Color Variants</h4>
			<div class="grid gap-4">
				<Rating value={4} variant="primary" label="Primary" />
				<Rating value={4} variant="secondary" label="Secondary" />
				<Rating value={4} variant="tertiary" label="Tertiary" />
				<Rating value={4} variant="accent" label="Accent" />
				<Rating value={4} variant="muted" label="Muted" />
				<Rating value={4} variant="success" label="Success" />
				<Rating value={4} variant="warning" label="Warning" />
				<Rating value={4} variant="error" label="Error" />
				<Rating value={4} variant="info" label="Info" />
			</div>
		</div>

		<!-- States -->
		<div class="space-y-4">
			<h4 class="text-lg font-semibold">States</h4>
			<div class="grid gap-4">
				<Rating value={3} disabled label="Disabled rating" />
				<Rating value={0} label="Empty rating" />
				<Rating value={5} label="Maximum rating" />
			</div>
		</div>
	</CardBody>
</Card>
