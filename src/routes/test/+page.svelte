<script lang="ts">
    import ThemeToggle from "$lib/ThemeToggle.svelte";
    import Tab from "$lib/tab/Tab.svelte";
    import TabHeader from "$lib/tab/TabHeader.svelte";
    import TabTitle from "$lib/tab/TabTitle.svelte";
    import TabBody from "$lib/tab/TabBody.svelte";
    import TabContent from "$lib/tab/TabContent.svelte";
    let activeTab = 0;
</script>

<div class="absolute top-4 right-4 z-10">
    <ThemeToggle leftLabel="Light Mode" rightLabel="Dark Mode" />
</div>

<div class="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-blue-950 p-4">
    <Tab>
        <TabHeader>
            <TabTitle active={activeTab === 0} onclick={() => activeTab = 0}>First Panel</TabTitle>
            <TabTitle active={activeTab === 1} onclick={() => activeTab = 1}>Second Panel</TabTitle>
        </TabHeader>
        <TabBody>
            {#if activeTab === 0}
                <TabContent>
                    <h1>First Panel</h1>
                    <p>First Panel Content</p>
                </TabContent>
            {:else}
                <TabContent>
                    <h1>Second Panel</h1>
                    <p>Second Panel Content</p>
                </TabContent>
            {/if}
        </TabBody>
    </Tab>
</div>