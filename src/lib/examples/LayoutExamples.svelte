<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import Masonry from '$lib/Masonry.svelte';
</script>

<h3 class="mb-6 text-xl font-bold">Layout & Structure Components</h3>
<Masonry
    colWidth="minmax(Min(30em, 100%), 1fr)"
    gridGap="1.5rem"
    padding="0.5rem"
    reset={true}
>
    <Card>
        <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>Collapsible content sections</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>Aspect Ratio</CardTitle>
            <CardDescription>Maintained ratio container</CardDescription>
        </CardHeader>
        <CardBody>Coming soon...</CardBody>
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
