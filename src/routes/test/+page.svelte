<script lang="ts">
    import ThemeToggle from '$lib/ThemeToggle.svelte';
    import Tab from '$lib/tab/Tab.svelte';
    import TabTrigger from '$lib/tab/TabTrigger.svelte';
    import TabContent from '$lib/tab/TabContent.svelte';
</script>

<div class="absolute top-4 right-4 z-10">
    <ThemeToggle leftLabel="Light Mode" rightLabel="Dark Mode" />
</div>

<div class="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-blue-950 p-4">
    <div class="w-full max-w-3xl space-y-8">
        <Tab value="tab1" class="w-full">
            {#snippet triggers()}
                <TabTrigger value="tab1" variant="error">Primary Tab</TabTrigger>
                <TabTrigger value="tab2" variant="secondary">Secondary Tab</TabTrigger>
                <TabTrigger value="tab3" variant="accent">Accent Tab</TabTrigger>
                <TabTrigger value="tab4" variant="error">Error Tab</TabTrigger>
                <TabTrigger value="tab5" variant="success">Success Tab</TabTrigger>
            {/snippet}

            {#snippet content()}
                <TabContent value="tab1">
                    <h3 class="mb-2 text-xl font-bold">Primary Tab Content</h3>
                    <p>This shows the primary variant styling.</p>
                </TabContent>
                <TabContent value="tab2">
                    <h3 class="mb-2 text-xl font-bold">Secondary Tab Content</h3>
                    <p>This shows the secondary variant styling.</p>
                </TabContent>
                <TabContent value="tab3">
                    <h3 class="mb-2 text-xl font-bold">Accent Tab Content</h3>
                    <p>This shows the accent variant styling.</p>
                </TabContent>
                <TabContent value="tab4">
                    <h3 class="mb-2 text-xl font-bold">Error Tab Content</h3>
                    <p>This shows the error variant styling.</p>
                </TabContent>
                <TabContent value="tab5">
                    <h3 class="mb-2 text-xl font-bold">Success Tab Content</h3>
                    <p>This shows the success variant styling.</p>
                </TabContent>
            {/snippet}
        </Tab>
    </div>
</div>