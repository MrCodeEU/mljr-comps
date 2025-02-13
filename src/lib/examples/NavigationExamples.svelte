<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import Masonry from '$lib/Masonry.svelte';
</script>

<h3 class="mb-6 text-xl font-bold">Navigation & Menu Components</h3>
<Masonry
    colWidth="minmax(Min(30em, 100%), 1fr)"
    gridGap="1.5rem"
    padding="0.5rem"
    reset={true}
>
    <Card>
        <CardHeader>
            <CardTitle>Command</CardTitle>
            <CardDescription>Command palette interface</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Context Menu</CardTitle>
            <CardDescription>Right-click menu interface</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Contextual dropdown interface</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Menubar</CardTitle>
            <CardDescription>Horizontal menu system</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Navigation Menu</CardTitle>
            <CardDescription>Hierarchical navigation component</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <CardDescription>Page navigation controls</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Toolbar</CardTitle>
            <CardDescription>Tool container component</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>
</Masonry>
