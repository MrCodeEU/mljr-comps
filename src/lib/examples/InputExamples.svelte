<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardBody,
		DateRangeCalendar
	} from '$lib/index.js';
	import Masonry from '$lib/Masonry.svelte';
	import Button from '$lib/Button.svelte';
	import Icon from '@iconify/svelte';
	import { Checkbox, CheckboxLabel, CheckboxGroup } from '$lib/index.js';
	import { DatePicker, DateRangePicker, DatePickerCalendar } from '$lib/index.js';
	import { today, getLocalTimeZone, CalendarDate, type DateValue } from '@internationalized/date';
	import type { DateRange } from 'bits-ui';
	import { Select, SelectContent, SelectItem, Slider } from '$lib/index.js';
    import PinInput from '$lib/pin-input/PinInput.svelte';
    import { Radio, RadioGroup, RadioLabel } from '$lib/index.js';
    import { useId } from 'bits-ui';
    import Toggle from '$lib/Toggle.svelte';
    import { Input, NumberInput, PhoneInput } from '$lib/input/index.js';
    
    const fruits = [
        { value: 'apple', label: 'Apple', icon: 'mdi:food-apple' },
        { value: 'banana', label: 'Banana', icon: 'lucide:banana' },
        { value: 'orange', label: 'Orange', icon: 'icon-park-outline:orange-one' },
        { value: 'mango', label: 'Mango', icon: 'fluent-emoji-high-contrast:mango' },
        { value: 'grape', label: 'Grape', icon: 'mdi:fruit-grapes' }
    ];

    const colors = [
        { value: 'red', label: 'Red', icon: 'mdi:circle' },
        { value: 'blue', label: 'Blue', icon: 'mdi:circle' },
        { value: 'green', label: 'Green', icon: 'mdi:circle' },
        { value: 'yellow', label: 'Yellow', icon: 'mdi:circle' },
        { value: 'purple', label: 'Purple', icon: 'mdi:circle' }
    ];

    let singleDate = $state<DateValue>();
	let dateRange = $state<DateRange>({ start: undefined, end: undefined });
	let selectedFruit = $state('');
    let selectedColors = $state<string[]>([]);
    let selectedOption = $state('');
    let toggleState = $state(false);
    let toggleWifi = $state(true);
    let toggleDarkMode = $state(false);
    let toggleNotifications = $state(true);
    let phoneNumber = $state('');
    let countryCode = $state('US');
    
	let selectedFruitLabel = $derived(fruits.find(f => f.value === selectedFruit)?.label ?? 'Nothing selected');
	let singleSliderValue = $state(50);
	let rangeSliderLower = $state(25);
	let rangeSliderUpper = $state(75);
</script>

<h3 class="mb-6 text-xl font-bold">Input & Form Components</h3>
<Masonry colWidth="minmax(Min(30em, 100%), 1fr)" gridGap="1.5rem" padding="0.5rem" reset={true}>
	<!-- Button card with all its content -->
	<Card>
		<CardHeader>
			<CardTitle>Button</CardTitle>
			<CardDescription>Interactive button component with various styles and states</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Variant Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="flex flex-wrap gap-2">
					<Button>Primary Button</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="tertiary">Tertiary</Button>
					<Button variant="accent">Accent</Button>
					<Button variant="muted">Muted</Button>
				</div>
			</div>

			<!-- State Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="flex flex-wrap gap-2">
					<Button active={false}>Disabled</Button>
					<Button variant="error">Error</Button>
					<Button variant="success">Success</Button>
					<Button variant="warning">Warning</Button>
					<Button variant="info">Info</Button>
				</div>
			</div>

			<!-- Icon Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">With Icons</h4>
				<div class="flex flex-wrap gap-2">
					<Button>
						<Icon icon="mdi:plus" class="mr-2" />
						Add Item
					</Button>
					<Button variant="secondary">
						Settings
						<Icon icon="mdi:cog" class="ml-2" />
					</Button>
					<Button variant="accent">
						<Icon icon="mdi:heart" class="mr-2" />
						Like
					</Button>
					<Button variant="error">
						<Icon icon="mdi:delete" class="mr-2" />
						Delete
					</Button>
				</div>
			</div>

			<!-- Icon Only Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Icon Only</h4>
				<div class="flex flex-wrap gap-2">
					<Button class="p-2">
						<Icon icon="mdi:plus" class="text-xl" />
					</Button>
					<Button variant="secondary" class="p-2">
						<Icon icon="mdi:cog" class="text-xl" />
					</Button>
					<Button variant="accent" class="p-2">
						<Icon icon="mdi:heart" class="text-xl" />
					</Button>
					<Button variant="muted" class="p-2">
						<Icon icon="mdi:share" class="text-xl" />
					</Button>
				</div>
			</div>

			<!-- Custom Styling Example -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Custom Styling</h4>
				<div class="flex flex-wrap gap-2">
					<Button class="h-12 rounded-none">Not rounded Button</Button>
					<Button class="h-12 w-48 justify-between">
						Full Width
						<Icon icon="mdi:arrow-right" />
					</Button>
					<Button variant="accent" class="h-18">Tall Button</Button>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Input</CardTitle>
			<CardDescription>Text input fields with claymorphism design</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold">Basic Inputs</h4>
				<div class="grid gap-4">
					<Input placeholder="Basic input" />
					<Input placeholder="With label" label="Username" />
					<Input type="password" placeholder="Password input" icon="mdi:lock" />
					<Input type="email" placeholder="Email input" icon="mdi:email" iconPosition="right" />
					<!-- Text inputs -->
                    <Input placeholder="Basic text input" />
                    <Input type="text" placeholder="Another text input" icon="mdi:text" />
                    
                    <!-- Number inputs -->
                    <Input type="number" placeholder="Enter a number" icon="mdi:numeric" />
                    <Input type="number" placeholder="Price" icon="mdi:currency-usd" iconPosition="right" />
                    
                    <!-- Email inputs -->
                    <Input type="email" placeholder="Enter your email" icon="mdi:email" />
                    <Input type="email" placeholder="Work email" icon="mdi:email-check" iconPosition="right" />
                    
                    <!-- Password inputs -->
                    <Input type="password" placeholder="Enter password" icon="mdi:lock" />
                    <Input type="password" placeholder="Confirm password" icon="mdi:lock-check" iconPosition="right" />
				</div>
			</div>

			<!-- Variants -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="grid gap-4">
					<Input variant="primary" placeholder="Primary variant" />
					<Input variant="accent" placeholder="Accent variant" />
					<Input variant="info" placeholder="Info variant" />
					<Input variant="muted" placeholder="Muted variant" />
				</div>
			</div>

			<!-- Sizes -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold">Sizes</h4>
				<div class="grid gap-4">
					<Input size="sm" placeholder="Small input" />
					<Input size="md" placeholder="Medium input" />
					<Input size="lg" placeholder="Large input" />
				</div>
			</div>

			<!-- States -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="grid gap-4">
					<Input disabled placeholder="Disabled input" />
					<Input error={true} placeholder="Error state" />
					<Input readonly value="Read-only input" />
					<Input required label="Required field" placeholder="Required input" />
				</div>
			</div>

			<!-- Number Inputs -->
			<div class="space-y-4">
				<h4 class="text-lg font-semibold">Number Inputs</h4>
				<div class="grid gap-4">
					<NumberInput label="Basic number" />
					<NumberInput variant="accent" min={0} max={100} step={5} label="With constraints" />
					<NumberInput variant="info" controls={false} label="Without controls" />
					<NumberInput disabled label="Disabled number input" />
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Checkbox</CardTitle>
			<CardDescription
				>Interactive checkbox selection control with claymorphic design</CardDescription
			>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Variant Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="flex flex-wrap gap-4">
					<div class="flex items-center gap-2">
						<Checkbox variant="primary" />
						<CheckboxLabel>Primary</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="secondary" />
						<CheckboxLabel>Secondary</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="tertiary" />
						<CheckboxLabel>Tertiary</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="accent" />
						<CheckboxLabel>Accent</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="muted" />
						<CheckboxLabel>Muted</CheckboxLabel>
					</div>
				</div>
			</div>

			<!-- State Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="flex flex-wrap gap-4">
					<div class="flex items-center gap-2">
						<Checkbox disabled checked />
						<CheckboxLabel>Disabled</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="error" checked />
						<CheckboxLabel>Error</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="success" checked />
						<CheckboxLabel>Success</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="warning" checked />
						<CheckboxLabel>Warning</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox variant="info" checked />
						<CheckboxLabel>Info</CheckboxLabel>
					</div>
				</div>
			</div>

			<!-- Group Example -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Checkbox Group</h4>
				<CheckboxGroup name="preferences" class="space-y-2">
					<div class="flex items-center gap-2">
						<Checkbox value="emails" variant="primary" />
						<CheckboxLabel>Receive emails</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox value="updates" variant="secondary" />
						<CheckboxLabel>Get updates</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox value="offers" variant="accent" />
						<CheckboxLabel>Special offers</CheckboxLabel>
					</div>
				</CheckboxGroup>
			</div>

			<!-- Indeterminate Example -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Indeterminate State</h4>
				<div class="flex items-center gap-2">
					<Checkbox indeterminate variant="primary" />
					<CheckboxLabel>Mixed selection</CheckboxLabel>
				</div>
			</div>

			<!-- Custom Icons Example -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Custom Icons</h4>
				<div class="flex flex-wrap gap-4">
					<div class="flex items-center gap-2">
						<Checkbox checkedIcon="mdi:heart" uncheckedIcon="mdi:heart-outline" variant="accent" />
						<CheckboxLabel>Heart Icons</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox
							checkedIcon="material-symbols:star-rounded"
							uncheckedIcon="material-symbols:star-outline-rounded"
							variant="warning"
						/>
						<CheckboxLabel>Star Rating</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox
							checkedIcon="mdi:bookmark-check"
							uncheckedIcon="mdi:bookmark-outline"
							indeterminateIcon="mdi:bookmark-minus"
							variant="primary"
						/>
						<CheckboxLabel>Bookmark</CheckboxLabel>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox
							checkedIcon="mdi:thumb-up"
							uncheckedIcon="mdi:thumb-up-outline"
							variant="success"
							iconClass="h-6 w-6"
						/>
						<CheckboxLabel>Like</CheckboxLabel>
					</div>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Date Field</CardTitle>
			<CardDescription>Date input field with claymorphic design</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Variant Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="flex flex-wrap gap-4">
					<DatePicker bind:value={singleDate} variant="primary">
						{#snippet labelSnippet()}Primary{/snippet}
						{#snippet calendarSnippet({ months, weekdays })}
							<DatePickerCalendar {months} {weekdays} />
						{/snippet}
					</DatePicker>

					<DatePicker bind:value={singleDate} variant="accent">
						{#snippet labelSnippet()}Accent{/snippet}
						{#snippet calendarSnippet({ months, weekdays })}
							<DatePickerCalendar {months} {weekdays} />
						{/snippet}
					</DatePicker>

					<DatePicker bind:value={singleDate} variant="muted">
						{#snippet labelSnippet()}Muted{/snippet}
						{#snippet calendarSnippet({ months, weekdays })}
							<DatePickerCalendar {months} {weekdays} />
						{/snippet}
					</DatePicker>
				</div>
			</div>

			<!-- State Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="flex flex-wrap gap-4">
					<DatePicker disabled variant="primary">
						{#snippet labelSnippet()}Disabled{/snippet}
						{#snippet calendarSnippet({ months, weekdays })}
							<DatePickerCalendar {months} {weekdays} />
						{/snippet}
					</DatePicker>

					<DatePicker
						bind:value={singleDate}
						minValue={today(getLocalTimeZone())}
						variant="warning"
					>
						{#snippet labelSnippet()}Future Only{/snippet}
						{#snippet calendarSnippet({ months, weekdays })}
							<DatePickerCalendar {months} {weekdays} />
						{/snippet}
					</DatePicker>

					<DatePicker variant="error">
						{#snippet labelSnippet()}Invalid{/snippet}
						{#snippet calendarSnippet({ months, weekdays })}
							<DatePickerCalendar {months} {weekdays} />
						{/snippet}
					</DatePicker>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Date Range Field</CardTitle>
			<CardDescription>Date range selection with claymorphic design</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Basic Range</h4>
				<div class="flex flex-wrap gap-4">
					<DateRangePicker value={dateRange} variant="primary">
						{#snippet labelSnippet()}Select Range{/snippet}
					</DateRangePicker>
				</div>
			</div>

			<!-- Variants -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="flex flex-wrap gap-4">
					<DateRangePicker variant="accent">
						{#snippet labelSnippet()}Booking Period{/snippet}
					</DateRangePicker>

					<DateRangePicker variant="success">
						{#snippet labelSnippet()}Available Dates{/snippet}
					</DateRangePicker>
				</div>
			</div>

			<!-- Custom Range Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">With Constraints</h4>
				<div class="flex flex-wrap gap-4">
					<DateRangePicker variant="info" minValue={today(getLocalTimeZone())}>
						{#snippet labelSnippet()}Future Dates Only{/snippet}
					</DateRangePicker>

					<DateRangePicker variant="warning" disabled>
						{#snippet labelSnippet()}Disabled Range{/snippet}
					</DateRangePicker>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>PIN Input</CardTitle>
			<CardDescription>Segmented input for PIN/OTP codes</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Basic PIN</h4>
				<div class="space-y-4">
					<PinInput maxlength={6} />
					<PinInput maxlength={4} variant="accent" />
				</div>
			</div>

			<!-- Variants -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="space-y-4">
					<PinInput variant="primary" />
					<PinInput variant="secondary" />
					<PinInput variant="accent" />
					<PinInput variant="muted" />
				</div>
			</div>

			<!-- States -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="space-y-4">
					<PinInput disabled variant="muted" value="123" />
					<PinInput variant="error" value="12345" />
					<PinInput variant="success" value="123456" />
					<PinInput variant="warning" showCaret={false} />
				</div>
			</div>

			<!-- Custom Configuration -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Custom Configuration</h4>
				<div class="space-y-4">
					<PinInput maxlength={8} separator={false} variant="info" />
					<PinInput maxlength={3} variant="accent" />
					<PinInput 
						variant="success" 
						onComplete={(value) => alert(`Completed: ${value}`)}
					/>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Radio Group</CardTitle>
			<CardDescription>Exclusive selection controls</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Basic Radio</h4>
				<RadioGroup bind:value={selectedOption}>
					{#each ['Option 1', 'Option 2', 'Option 3'] as option}
						{@const id = useId()}
						<div class="flex items-center gap-2">
							<Radio value={option} id={id} variant="primary" />
							<RadioLabel htmlFor={id}>{option}</RadioLabel>
						</div>
					{/each}
				</RadioGroup>
			</div>

			<!-- Variants -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="space-y-4">
					{#each ['primary', 'secondary', 'accent', 'muted'] as variant}
						<RadioGroup>
							{#each ['A', 'B', 'C'] as option}
								{@const id = useId()}
								<div class="flex items-center gap-2">
									<Radio value={option} variant={variant as Variant} id={id} />
									<RadioLabel htmlFor={id}>Option {option}</RadioLabel>
								</div>
							{/each}
						</RadioGroup>
					{/each}
				</div>
			</div>

			<!-- States -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="space-y-4">
					<!-- Disabled -->
					<RadioGroup disabled>
						{#each ['X', 'Y', 'Z'] as option}
							{@const id = useId()}
							<div class="flex items-center gap-2">
								<Radio disabled value={option} id={id} variant="muted" />
								<RadioLabel htmlFor={id}>Disabled {option}</RadioLabel>
							</div>
						{/each}
					</RadioGroup>

					<!-- Required -->
					<RadioGroup required>
						{#each ['1', '2', '3'] as option}
							{@const id = useId()}
							<div class="flex items-center gap-2">
								<Radio value={option} id={id} variant="warning" />
								<RadioLabel htmlFor={id}>Required {option}</RadioLabel>
							</div>
						{/each}
					</RadioGroup>
				</div>
			</div>

			<!-- Orientation -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Horizontal Layout</h4>
				<RadioGroup orientation="horizontal">
					{#each ['Left', 'Center', 'Right'] as option}
						{@const id = useId()}
						<div class="flex items-center gap-2">
							<Radio value={option} id={id} variant="accent" />
							<RadioLabel htmlFor={id}>{option}</RadioLabel>
						</div>
					{/each}
				</RadioGroup>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Select</CardTitle>
			<CardDescription>Dropdown selection control with claymorphic design</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Basic Select</h4>
				<div class="flex flex-wrap gap-4">
					<Select 
						items={fruits} 
						bind:value={selectedFruit} 
						placeholder="Choose a fruit"
						variant="primary"
					>
						<SelectContent>
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>

					<div class="clay flex items-center gap-2 px-4 py-2">
						<span>Selected: </span>
						{#if selectedFruit && fruits.find(f => f.value === selectedFruit)?.icon}
							<Icon icon={fruits.find(f => f.value === selectedFruit)!.icon} class="size-5" />
						{/if}
						<span class="font-medium">{selectedFruitLabel}</span>
					</div>
				</div>
			</div>

			<!-- Variants -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="flex flex-wrap gap-4">
					<Select items={fruits} variant="secondary" placeholder="Secondary">
						<SelectContent variant="secondary">
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>

					<Select items={fruits} variant="accent" placeholder="Accent">
						<SelectContent variant="accent">
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>

					<Select items={fruits} variant="muted" placeholder="Muted">
						<SelectContent variant="muted">
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>
				</div>
			</div>

			<!-- With Icons -->
			<div class="space-y-2"></div>
				<h4 class="text-lg font-semibold">With Icons</h4>
				<div class="flex flex-wrap gap-4">
					<Select 
						items={colors} 
						variant="primary" 
						icon="mdi:palette"
						placeholder="Select color"
					>
						<SelectContent>
							{#each colors as color}
								<SelectItem 
									value={color.value} 
									label={color.label} 
									icon={color.icon}
								/>
							{/each}
						</SelectContent>
					</Select>

					<Select 
						items={fruits} 
						variant="accent" 
						icon="mdi:fruit-cherries"
						placeholder="Select fruit"
					>
						<SelectContent variant="accent">
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>
				</div>

			<!-- States -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="flex flex-wrap gap-4">
					<Select 
						items={fruits} 
						disabled 
						variant="muted"
						placeholder="Disabled select"
					>
						<SelectContent>
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>

					<Select 
						items={fruits} 
						required 
						variant="warning"
						placeholder="Required select"
					>
						<SelectContent variant="warning">
							{#each fruits as fruit}
								<SelectItem 
									value={fruit.value} 
									label={fruit.label} 
									icon={fruit.icon}
								/>
							{/each}
						</SelectContent>
					</Select>
				</div>
			</div>

			<!-- Multiple Selection -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Multiple Selection</h4>
				<div class="flex flex-wrap gap-4">
					<Select 
						items={colors} 
						type="multiple"
						bind:value={selectedColors}
						variant="info"
						placeholder="Select multiple colors"
					>
						<SelectContent variant="info">
							{#each colors as color}
								<SelectItem 
									value={color.value} 
									label={color.label} 
									icon={color.icon}
								/>
							{/each}
						</SelectContent>
					</Select>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Slider</CardTitle>
			<CardDescription>Range input control with claymorphic design</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Basic Slider</h4>
				<div class="space-y-4">
					<Slider bind:value={singleSliderValue} />
					<Slider value={75} variant="accent" showFloatingLabel />
				</div>
			</div>

			<!-- Variants -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="space-y-4">
					<Slider value={25} variant="primary" showTicks showLabels />
					<Slider value={50} variant="secondary" showTicks showLabels />
					<div class="flex gap-12 p-5">
						<Slider value={75} orientation="vertical" variant="accent" showTicks showLabels showFloatingLabel />
						<Slider value={60} orientation="vertical" variant="warning" showTicks showLabels />
					</div>
				</div>
			</div>

			<!-- Range Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Range Selection</h4>
				<div class="space-y-4">
					<Slider 
						bind:lowerValue={rangeSliderLower}
						bind:upperValue={rangeSliderUpper}
						variant="primary"
						showFloatingLabel 
					/>
					<Slider 
						lowerValue={30}
						upperValue={60}
						variant="accent"
						showTicks
						showLabels
						formatLabel={(v) => `$${v}`}
					/>
				</div>
			</div>

			<!-- Custom Steps -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Custom Steps</h4>
				<div class="space-y-4">
					<Slider 
						value={50} 
						step={10} 
						showTicks 
						showLabels
						variant="info"
					/>
					<Slider 
						lowerValue={200}
						upperValue={800}
						min={0}
						max={1000}
						step={100}
						showTicks
						showLabels
						variant="success"
						formatLabel={(v) => `${v}ms`}
					/>
				</div>
			</div>

			<!-- States -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="space-y-4">
					<Slider value={30} disabled variant="muted" showFloatingLabel />
					<Slider 
						lowerValue={20}
						upperValue={60}
						disabled 
						variant="muted" 
						showFloatingLabel 
					/>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Toggle</CardTitle>
			<CardDescription>Two-state button control with claymorphic design</CardDescription>
		</CardHeader>
		<CardBody class="space-y-8">
			<!-- Basic Examples -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Basic Toggle</h4>
				<div class="space-y-4">
					<Toggle bind:checked={toggleState} />
					<Toggle bind:checked={toggleState} variant="accent">
						{#snippet rightLabel()}Simple Toggle{/snippet}
					</Toggle>
				</div>
			</div>

			<!-- Variants -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Variants</h4>
				<div class="space-y-4">
					<Toggle 
						bind:checked={toggleWifi} 
						variant="primary"
						leftIcon="mdi:wifi"
						rightIcon="mdi:wifi-off"
					>
						{#snippet rightLabel()}Wi-Fi{/snippet}
					</Toggle>

					<Toggle 
						bind:checked={toggleDarkMode} 
						variant="accent"
						leftIcon="ph:sun-bold"
						rightIcon="ph:moon-bold"
					>
						{#snippet rightLabel()}Dark Mode{/snippet}
					</Toggle>

					<Toggle 
						bind:checked={toggleNotifications} 
						variant="success"
						leftIcon="mdi:bell"
						rightIcon="mdi:bell-off"
					>
						{#snippet rightLabel()}Notifications{/snippet}
					</Toggle>
				</div>
			</div>

			<!-- States -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">States</h4>
				<div class="space-y-4">
					<Toggle disabled variant="muted" checked={true}>
						{#snippet rightLabel()}Disabled Toggle{/snippet}
					</Toggle>

					<Toggle disabled checked variant="muted">
						{#snippet rightLabel()}Disabled & Checked{/snippet}
					</Toggle>

					<Toggle variant="warning" checked={true}>
						{#snippet leftLabel()}Required{/snippet}
						{#snippet rightLabel()}Important Setting{/snippet}
					</Toggle>
				</div>
			</div>

			<!-- Custom Labels -->
			<div class="space-y-2">
				<h4 class="text-lg font-semibold">Custom Labels</h4>
				<div class="space-y-4">
					<Toggle variant="info" checked={false}>
						{#snippet leftLabel()}OFF{/snippet}
						{#snippet rightLabel()}ON{/snippet}
					</Toggle>

					<Toggle variant="error" checked={true}>
						{#snippet leftLabel()}Inactive{/snippet}
						{#snippet rightLabel()}Active{/snippet}
					</Toggle>

					<Toggle 
						variant="success"
						leftIcon="mdi:close"
						rightIcon="mdi:check"
						checked={true}
					>
						{#snippet leftLabel()}Deny{/snippet}
						{#snippet rightLabel()}Allow{/snippet}
					</Toggle>
				</div>
			</div>
		</CardBody>
	</Card>

    <Card>
        <CardHeader>
            <CardTitle>Phone Input</CardTitle>
            <CardDescription>International phone number input with country selection</CardDescription>
        </CardHeader>
        <CardBody class="space-y-8">
            <!-- Basic Examples -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold">Basic Phone Input</h4>
                <div class="grid gap-4">
                    <PhoneInput 
                        bind:value={phoneNumber}
                        label="Phone Number"
                    />
                    <PhoneInput 
                        variant="accent"
                        placeholder="Enter mobile number"
                    />
                </div>
            </div>

            <!-- Variants -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold">Variants</h4>
                <div class="grid gap-4">
                    <PhoneInput variant="primary" />
                    <PhoneInput variant="secondary" />
                    <PhoneInput variant="accent" />
                    <PhoneInput variant="muted" />
                </div>
            </div>

            <!-- Sizes -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold">Sizes</h4>
                <div class="grid gap-4">
                    <PhoneInput size="sm" />
                    <PhoneInput size="md" />
                    <PhoneInput size="lg" />
                </div>
            </div>

            <!-- States -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold">States</h4>
                <div class="grid gap-4">
                    <PhoneInput disabled />
                    <PhoneInput error />
                    <PhoneInput required label="Required Phone" />
                </div>
            </div>
        </CardBody>
    </Card>
</Masonry>
