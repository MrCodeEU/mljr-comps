<script lang="ts">
    import { Avatar } from 'bits-ui';
    import { cn } from '$lib/utility.js';

    let {
        src,
        alt,
        fallback,
        size = "md",
        ref = $bindable(null),
        imageRef = $bindable(null),
        fallbackRef = $bindable(null),
        class: className = "",
        ...restProps
    } = $props<{
        src: string;
        alt: string;
        fallback: string;
        size?: "sm" | "md" | "lg";
        ref?: HTMLElement | null;
        imageRef?: HTMLImageElement | null;
        fallbackRef?: HTMLElement | null;
        class?: string;
    }>();

    const sizeClasses: Record<"sm" | "md" | "lg", string> = {
        "sm": "h-8 w-8 text-xs",
        "md": "h-12 w-12 text-sm",
        "lg": "h-16 w-16 text-base"
    };

    let loadingStatus = $state<Avatar.RootProps["loadingStatus"]>("loading");
</script>

<Avatar.Root
    bind:loadingStatus
    bind:ref
    class={cn(
        "relative overflow-hidden",
        "bg-muted text-muted-foreground font-medium uppercase",
        sizeClasses[size as "sm" | "md" | "lg"],
        loadingStatus === 'loaded' ? 'clay' : 'clay-inset',
        className
    )}
    {...restProps}
>
    <div class="flex h-full w-full items-center justify-center">
        <Avatar.Image 
            {src} 
            {alt} 
            bind:ref={imageRef}
            class="h-full w-full object-cover"
        />
        <Avatar.Fallback 
            bind:ref={fallbackRef}
            class="absolute inset-0 flex items-center justify-center"
        >
            {fallback}
        </Avatar.Fallback>
    </div>
</Avatar.Root>
