<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import Masonry from '$lib/Masonry.svelte';
</script>

<h3 class="mb-6 text-xl font-bold">Overlay & Popup Components</h3>
<Masonry
    colWidth="minmax(Min(30em, 100%), 1fr)"
    gridGap="1.5rem"
    padding="0.5rem"
    reset={true}
>
    <Card>
        <CardHeader>
            <CardTitle>Alert Dialog</CardTitle>
            <CardDescription>Modal dialog for important messages</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Date selection calendar</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Combobox</CardTitle>
            <CardDescription>Searchable dropdown selection</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Date Picker</CardTitle>
            <CardDescription>Date selection dialog</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Date Range Picker</CardTitle>
            <CardDescription>Date range selection dialog</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Dialog</CardTitle>
            <CardDescription>Modal dialog component</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Popover</CardTitle>
            <CardDescription>Floating content overlay</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Range Calendar</CardTitle>
            <CardDescription>Date range calendar component</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>
</Masonry>
