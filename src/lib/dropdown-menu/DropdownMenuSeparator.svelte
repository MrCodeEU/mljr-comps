<script lang="ts">
    import { DropdownMenu } from "bits-ui";
    import { cn } from "$lib/utility.js";

    let { class: className = "" } = $props<{ class?: string }>();
</script>

<DropdownMenu.Separator class={cn("my-1.5 h-px bg-base-content/20", className)} />
