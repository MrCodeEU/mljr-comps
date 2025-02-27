<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardBody, Button } from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import { Input } from '$lib/input/index.js';
	import Icon from '@iconify/svelte';
</script>

<h3 class="mb-6 text-xl font-bold">Compound Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<!-- Authentication & User Section -->
	<Card>
		<CardHeader>
			<CardTitle>Login Form</CardTitle>
			<CardDescription>Authentication form with social options</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<Input type="email" placeholder="Email" icon="mdi:email" />
				<Input type="password" placeholder="Password" />

				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<input type="checkbox" id="remember" class="clay-checkbox" />
						<label for="remember" class="text-sm">Remember me</label>
					</div>
					<a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
				</div>

				<Button variant="primary" class="w-full mt-2">
					<Icon icon="mdi:login" class="mr-2" />
					Sign In
				</Button>

				<div class="relative my-2">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300"></div>
					</div>
					<div class="relative flex justify-center">
						<span class="bg-white px-2 text-sm text-gray-500 dark:bg-gray-800">Or continue with</span>
					</div>
				</div>

				<div class="flex gap-2">
					<Button variant="secondary" class="flex-1">
						<Icon icon="mdi:google" class="mr-2" />
						Google
					</Button>
					<Button variant="secondary" class="flex-1">
						<Icon icon="mdi:github" class="mr-2" />
						GitHub
					</Button>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Registration Form -->
	<Card>
		<CardHeader>
			<CardTitle>Registration Form</CardTitle>
			<CardDescription>Create a new account</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-2 gap-4">
					<Input placeholder="First name" />
					<Input placeholder="Last name" />
				</div>
				<Input type="email" placeholder="Email" icon="mdi:email" />
				<Input type="password" placeholder="Password" />
				<Input type="password" placeholder="Confirm password" />

				<div class="flex items-center gap-2 mt-2">
					<input type="checkbox" id="terms" class="clay-checkbox" />
					<label for="terms" class="text-sm">
						I agree to the <a href="#" class="text-primary hover:underline">Terms</a> and
						<a href="#" class="text-primary hover:underline">Privacy Policy</a>
					</label>
				</div>

				<Button variant="primary" class="w-full mt-2">Create Account</Button>
			</div>
		</CardBody>
	</Card>

	<!-- Cookie Consent -->
	<Card>
		<CardHeader>
			<CardTitle>Cookie Consent</CardTitle>
			<CardDescription>GDPR compliant cookie notification</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay-card bg-info/10 p-4 rounded-lg">
				<div class="flex flex-col gap-4">
					<div class="flex items-start gap-4">
						<Icon icon="mdi:cookie" class="text-4xl" />
						<div>
							<h4 class="font-semibold mb-1">We use cookies</h4>
							<p class="text-sm">
								This website uses cookies to ensure you get the best experience on our website.
							</p>
						</div>
					</div>
					<div class="flex gap-2 justify-end">
						<Button variant="secondary" size="sm">Preferences</Button>
						<Button variant="info" size="sm">Accept All</Button>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Settings Panel -->
	<Card>
		<CardHeader>
			<CardTitle>Settings Panel</CardTitle>
			<CardDescription>User preference configuration</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="flex flex-col gap-4">
				<div class="clay bg-muted/20 rounded-lg p-4">
					<div class="font-semibold mb-2">Theme Settings</div>
					<div class="flex gap-2">
						<Button variant="primary" size="sm">Light</Button>
						<Button variant="secondary" size="sm">Dark</Button>
						<Button variant="secondary" size="sm">System</Button>
					</div>
				</div>
				
				<div class="clay bg-muted/20 rounded-lg p-4">
					<div class="font-semibold mb-2">Notification Settings</div>
					<div class="space-y-2">
						<div class="flex justify-between items-center">
							<span>Email notifications</span>
							<div class="clay-toggle bg-muted h-6 w-12 rounded-full relative cursor-pointer">
								<div class="clay-toggle-thumb absolute h-4 w-4 rounded-full bg-white top-1 left-1"></div>
							</div>
						</div>
						<div class="flex justify-between items-center">
							<span>Push notifications</span>
							<div class="clay-toggle bg-primary h-6 w-12 rounded-full relative cursor-pointer">
								<div class="clay-toggle-thumb absolute h-4 w-4 rounded-full bg-white top-1 left-7"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>

	<!-- Blog Post Card -->
	<Card>
		<CardHeader>
			<CardTitle>Blog Post Card</CardTitle>
			<CardDescription>Content preview with metadata</CardDescription>
		</CardHeader>
		<CardBody>
			<div class="clay max-w-md rounded-lg overflow-hidden">
				<img src="https://picsum.photos/600/300" alt="Blog header" class="w-full h-40 object-cover" />
				<div class="p-4">
					<h3 class="text-xl font-bold mb-2">Getting Started with Claymorphism</h3>
					<p class="text-muted-foreground mb-4 line-clamp-2">
						Learn how to create beautiful clay-like UI components for your Svelte applications...
					</p>
					<div class="flex justify-between items-center text-sm">
						<div class="flex items-center gap-2">
							<img 
								src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
								alt="Author" 
								class="w-6 h-6 rounded-full" 
							/>
							<span>John Doe</span>
						</div>
						<div class="flex items-center gap-1">
							<Icon icon="mdi:clock-outline" />
							<span>5 min read</span>
						</div>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>
</Masonry>
