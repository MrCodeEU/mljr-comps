<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogTitle,
		DialogDescription,
		DialogClose
	} from '$lib/dialog/index.js';
	import { Button } from '$lib/index.js';
	import Icon from '@iconify/svelte';
</script>

<h3 class="mb-6 text-xl font-bold">Dialog Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
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
</Masonry>
