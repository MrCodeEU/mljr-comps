<script lang="ts">
    import ThemeToggle from '$lib/ThemeToggle.svelte';
    import Tab from '$lib/tab/Tab.svelte';
    import TabTrigger from '$lib/tab/TabTrigger.svelte';
    import TabContent from '$lib/tab/TabContent.svelte';
    import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '$lib/index.js';
    import InputExamples from '$lib/examples/InputExamples.svelte';
    import NavigationExamples from '$lib/examples/NavigationExamples.svelte';
    import DisplayExamples from '$lib/examples/DisplayExamples.svelte';
    import LayoutExamples from '$lib/examples/LayoutExamples.svelte';
    import OverlayExamples from '$lib/examples/OverlayExamples.svelte';

    let refreshLayout: () => void;
</script>

<div class="absolute top-4 right-4 z-10">
    <ThemeToggle leftLabel="Light Mode" rightLabel="Dark Mode" />
</div>
<div class="flex min-h-screen items-center justify-center bg-gray-200 p-4 dark:bg-blue-950 pt-16">
    <Card class="w-[90%]">
        <CardHeader>
            <CardTitle class="text-center text-3xl font-bold">MLJR Components in Claymorphism</CardTitle>
            <CardDescription class="text-center">A collection of beautiful, accessible, and reusable components</CardDescription>
        </CardHeader>
        <CardBody>
            <Tab value="input" class="w-full">
                {#snippet triggers()}
                    <TabTrigger value="input">Input & Form</TabTrigger>
                    <TabTrigger value="navigation">Navigation & Menus</TabTrigger>
                    <TabTrigger value="display">Display & Feedback</TabTrigger>
                    <TabTrigger value="layout">Layout & Structure</TabTrigger>
                    <TabTrigger value="overlay">Overlay & Popups</TabTrigger>
                {/snippet}

                {#snippet content()}
                    <TabContent value="input">
                        <InputExamples/>
                    </TabContent>

                    <TabContent value="navigation">
                        <NavigationExamples/>
                    </TabContent>

                    <TabContent value="display">
                        <DisplayExamples/>
                    </TabContent>

                    <TabContent value="layout">
                        <LayoutExamples/>
                    </TabContent>

                    <TabContent value="overlay">
                        <OverlayExamples/>
                    </TabContent>
                {/snippet}
            </Tab>
        </CardBody>
    </Card>
</div>
