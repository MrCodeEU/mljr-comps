<script lang="ts">
    import { Checkbox } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { Snippet } from "svelte";

    let { 
        value = $bindable([]),
        disabled = false,
        required = false,
        name,
        class: className = "",
        children
    } : {
        value?: string[];
        disabled?: boolean;
        required?: boolean;
        name?: string;
        class?: string;
        children?: Snippet;
    } = $props();
</script>

<Checkbox.Group
    {value}
    {disabled}
    {required}
    {name}
    class={cn("flex flex-col gap-2", className)}
>
    {@render children?.()}
</Checkbox.Group>
