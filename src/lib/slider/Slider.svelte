<script lang="ts">
  import { Slider } from 'bits-ui';
  import { cn } from '$lib/utility.js';

  let {
    value = $bindable(0),
    lowerValue = $bindable(undefined),
    upperValue = $bindable(undefined),
    min = 0,
    max = 100,
    step = 1,
    orientation = 'horizontal',
    variant = 'primary',
    disabled = false,
    showTicks = false,
    showLabels = false,
    showFloatingLabel = false,
    formatLabel = (v: number) => v.toString(),
    class: className = '',
  }: {
    value?: number;
    lowerValue?: number;
    upperValue?: number;
    min?: number;
    max?: number;
    step?: number;
    orientation?: 'horizontal' | 'vertical';
    variant?: Variant;
    disabled?: boolean;
    showTicks?: boolean;
    showLabels?: boolean;
    showFloatingLabel?: boolean;
    formatLabel?: (value: number) => string;
    class?: string;
  } = $props();

  const variantClasses = {
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-black',
    tertiary: 'bg-tertiary text-black',
    accent: 'bg-accent text-black',
    muted: 'bg-neutral text-black dark:text-white',
    error: 'bg-error text-black',
    success: 'bg-success text-black',
    warning: 'bg-warning text-black',
    info: 'bg-info text-black'
  };

  const ticks = $derived(showTicks ? Array.from({ length: (max - min) / step + 1 }, (_, i) => i) : []);
  const isRange = $derived(lowerValue !== undefined && upperValue !== undefined);
  
  // Convert to bits-ui format
  $effect(() => {
    if (isRange) {
      sliderValue = [lowerValue ?? min, upperValue ?? max];
    } else {
      sliderValue = value ?? 0;
    }
  });

  let sliderValue = $state<number | number[]>((lowerValue !== undefined && upperValue !== undefined) ? [lowerValue, upperValue] : value);

  // Update our values from bits-ui format
  $effect(() => {
    if (Array.isArray(sliderValue)) {
      lowerValue = sliderValue[0];
      upperValue = sliderValue[1];
    } else {
      value = sliderValue;
    }
  });

  // Add orientation-specific classes
  const orientationClasses = {
    horizontal: 'flex-row items-center h-8',
    vertical: 'flex-col items-center w-8 h-[200px]'
  };

  const trackClasses = {
    horizontal: 'h-3 w-full top-1/2 -translate-y-1/2',
    vertical: 'w-3 h-full left-1/2 -translate-x-1/2'
  };

  const rangeClasses = {
    horizontal: 'h-full',
    vertical: 'w-full bottom-0'
  };

  const tickClasses = {
    horizontal: 'h-2 w-0.5',
    vertical: 'w-2 h-0.5'
  };

  const labelClasses = {
    horizontal: 'px-3.5 min-w-10 text-center',
    vertical: 'py-2 text-center min-h-[2rem] flex items-center'
  };
</script>

<div class={cn(
  'relative flex touch-none select-none',
  orientation === 'vertical' ? 'flex-col h-[200px] items-center' : 'flex-row w-full items-center',
  className
)}>
  {#if showLabels}
    <span class={cn(labelClasses[orientation], orientation === 'vertical' ? 'order-0' : '')}>{formatLabel(max)}</span>
  {/if}

  <Slider.Root
    type={isRange ? 'multiple' : 'single'}
    bind:value={sliderValue}
    {min}
    {max}
    {step}
    {orientation}
    {disabled}
    class="relative flex-1 touch-none select-none"
  >
    {#snippet children({ thumbs })}
      <div class={cn('relative flex', orientationClasses[orientation])}>
        <!-- Track background -->
        <span class={cn('absolute clay-inset bg-black/10', trackClasses[orientation])}>
          <!-- Colored range -->
          <Slider.Range class={cn(
            'absolute clay', 
            rangeClasses[orientation],
            variantClasses[variant as keyof typeof variantClasses]
          )} />
        </span>

        <!-- Ticks -->
        {#if showTicks}
          {#each ticks as tick}
            <Slider.Tick
              index={tick}
              class={cn('absolute bg-text/20', tickClasses[orientation])}
            />
          {/each}
        {/if}

        <!-- Thumbs -->
        {#each thumbs as index}
          <Slider.Thumb
            {index}
            class={cn(
              'absolute block h-7 w-7 clay',
              'active:clay-inset hover:translate-y-0.5 hover:shadow-none',
              'focus-visible:ring focus-visible:ring-offset-2',
              disabled && 'opacity-50 cursor-not-allowed',
              variantClasses[variant as keyof typeof variantClasses]
            )}
          >
            {#if showFloatingLabel}
              <div class={cn(
                'absolute px-2 py-1 clay text-sm',
                orientation === 'vertical' 
                  ? 'left-8 top-1/2 -translate-y-1/2' 
                  : '-top-8 left-1/2 -translate-x-1/2',
                variantClasses[variant as keyof typeof variantClasses]
              )}>
                {formatLabel(Array.isArray(sliderValue) ? sliderValue[index] : sliderValue)}
              </div>
            {/if}
          </Slider.Thumb>
        {/each}
      </div>
    {/snippet}
  </Slider.Root>

  {#if showLabels}
    <span class={cn(labelClasses[orientation], orientation === 'vertical' ? 'order-2' : '')}>{formatLabel(min)}</span>
  {/if}
</div>
