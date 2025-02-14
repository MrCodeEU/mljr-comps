<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import Masonry from '$lib/Masonry.svelte';
    import Button from '$lib/Button.svelte';
    import Icon from '@iconify/svelte';
    import { Checkbox, CheckboxLabel, CheckboxGroup } from '$lib/index.js';
</script>

<h3 class="mb-6 text-xl font-bold">Input & Form Components</h3>
<Masonry
    colWidth="minmax(Min(30em, 100%), 1fr)"
    gridGap="1.5rem"
    padding="0.5rem"
    reset={true}
>
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
                    <Button class="rounded-none h-12">
                        Not rounded Button
                    </Button>
                    <Button class="w-48 justify-between h-12">
                        Full Width
                        <Icon icon="mdi:arrow-right" />
                    </Button>
                    <Button variant="accent" class="h-18">
                        Tall Button
                    </Button>
                </div>
            </div>
        </CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Checkbox</CardTitle>
            <CardDescription>Interactive checkbox selection control with claymorphic design</CardDescription>
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
                        <Checkbox 
                            checkedIcon="mdi:heart"
                            uncheckedIcon="mdi:heart-outline"
                            variant="accent"
                        />
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
            <CardDescription>Date input field with validation</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Date Range Field</CardTitle>
            <CardDescription>Date range input field with validation</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Label</CardTitle>
            <CardDescription>Form label with advanced styling options</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>PIN Input</CardTitle>
            <CardDescription>Segmented input for PIN/OTP codes</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Radio Group</CardTitle>
            <CardDescription>Exclusive selection controls</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>Dropdown selection control</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Slider</CardTitle>
            <CardDescription>Range input control</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Switch</CardTitle>
            <CardDescription>Toggle switch control</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Toggle</CardTitle>
            <CardDescription>Two-state button control</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Toggle Group</CardTitle>
            <CardDescription>Group of toggleable buttons</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>
</Masonry>
