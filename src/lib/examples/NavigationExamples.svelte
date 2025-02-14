<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import Masonry from '$lib/Masonry.svelte';
    import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from '$lib/index.js';
    import Icon from '@iconify/svelte';
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
        <CardBody>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div class="flex h-[150px] w-full select-none items-center justify-center rounded-xl clay bg-base-200">
                        <div class="flex flex-col items-center justify-center gap-4 text-center">
                            <Icon icon="mdi:mouse" class="size-8" />
                            Right click here
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent variant="accent">
                    <ContextMenuItem icon="mdi:pencil" shortcut="⌘E">
                        Edit
                    </ContextMenuItem>
                    <ContextMenuItem icon="mdi:content-copy" shortcut="⌘C">
                        Copy
                    </ContextMenuItem>
                    <ContextMenuItem icon="mdi:content-cut" shortcut="⌘X">
                        Cut
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem icon="mdi:trash" shortcut="⌘⌫">
                        Delete
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem icon="mdi:share" disabled>
                        Share
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </CardBody>
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
