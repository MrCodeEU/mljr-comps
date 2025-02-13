<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import Masonry from '$lib/Masonry.svelte';
    import Button from '$lib/Button.svelte';
    import Icon from '@iconify/svelte';
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
            <CardDescription>Interactive checkbox selection control</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
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
