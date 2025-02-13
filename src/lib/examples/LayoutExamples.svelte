<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import { Accordion, AccordionItem } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import { AspectRatio } from '$lib/index.js';
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
                <AspectRatio ratio={16/9} class="clay overflow-hidden">
                    <img
                        src="https://picsum.photos/1600/900"
                        alt="Random"
                        class="absolute h-full w-full object-cover"
                    />
                    <div class="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                        16:9 Ratio
                    </div>
                </AspectRatio>

                <AspectRatio ratio={4/3} class="clay overflow-hidden">
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
			<CardDescription>Expandable content section</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Scroll Area</CardTitle>
			<CardDescription>Custom scrollable container</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Tabs</CardTitle>
			<CardDescription>Tabbed interface component</CardDescription>
		</CardHeader>
		<CardBody>Coming soon...</CardBody>
	</Card>
</Masonry>
