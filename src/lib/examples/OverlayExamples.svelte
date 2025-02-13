<script lang="ts">
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import { AlertDialog } from '$lib/alert-dialog/index.js';
    import Masonry from '$lib/Masonry.svelte';

    async function handleDelete() {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Account deleted successfully!');
    }
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
        <CardBody>
            <div class="flex flex-col gap-4">
                <AlertDialog
                    variant="error"
                    triggerText="Delete Account"
                    actionText="Delete"
                    onAction={handleDelete}
                    cardVariant="warning"
                >
                    {#snippet title()}
                        Delete Account
                    {/snippet}
                    {#snippet description()}
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    {/snippet}
                </AlertDialog>

                <AlertDialog
                    variant="primary"
                    triggerText="Show Info"
                    actionText="Got it"
                    cardVariant="primary"
                    cancelVariant="secondary"
                >
                    {#snippet title()}
                        Important Information
                    {/snippet}
                    {#snippet description()}
                        This is an example of an informative alert dialog with
                        a primary color scheme.
                    {/snippet}
                </AlertDialog>

                <AlertDialog
                    variant="info"
                    triggerText="No Buttons Example"
                    showButtons={false}
                    cardVariant="accent"
                >
                    {#snippet title()}
                        Notification Only
                    {/snippet}
                    {#snippet description()}
                        This is an example of an alert dialog without buttons.
                        Click outside to close.
                    {/snippet}
                </AlertDialog>

                <AlertDialog
                    variant="success"
                    triggerText="Success Dialog"
                    actionText="Complete"
                    cardVariant="success"
                    cancelVariant="error"
                >
                    {#snippet title()}
                        Operation Successful
                    {/snippet}
                    {#snippet description()}
                        Your changes have been saved successfully.
                    {/snippet}
                </AlertDialog>

                <AlertDialog
                    variant="info"
                    triggerText="Info Dialog"
                    actionText="OK"
                    cardVariant="info"
                >
                    {#snippet title()}
                        System Update
                    {/snippet}
                    {#snippet description()}
                        The system will be updated in the next 24 hours.
                    {/snippet}
                </AlertDialog>

            </div>
        </CardBody>
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
