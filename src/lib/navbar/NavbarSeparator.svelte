<script lang="ts">
  import { cn } from '$lib/utility.js';
  let { class: className = '', orientation = 'vertical' } = $props<{
    class?: string;
    orientation?: 'vertical' | 'horizontal';
  }>();
</script>

<div
  class={cn(
    'bg-current opacity-20',
    orientation === 'vertical' ? 'mx-2 h-6 w-px' : 'my-2 h-px w-full',
    className
  )}
  role="separator"
></div>
