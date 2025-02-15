<script lang="ts">
    import { cn } from "$lib/utility.js";
	import type { Snippet } from "svelte";
    let { class: className = "", children } = $props<{ class?: string, children?: Snippet }>();
</script>

<footer class={cn("mt-6 flex justify-end gap-2", className)}>
    {@render children?.()}
</footer>
