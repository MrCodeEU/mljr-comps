<script lang="ts">
    import Button from "$lib/Button.svelte";
    import type { Snippet } from "svelte";

    let { active = false, children } : { active?: boolean, children?: Snippet } = $props();
</script>

<Button 
    variant={active ? "primary" : "muted"}
    class="min-w-[120px] {active ? 'rounded-b-none -mb-[2px] z-10' : 'opacity-80'}"
    {active}
>
    {@render children?.()}
</Button>