<script lang="ts">
    import { cn } from '$lib/utility.js';
    import Icon from '@iconify/svelte';
    import { Input } from './index.js';
    import ComboBox from '../ComboBox.svelte';
    import { countries } from './countries.js';
    import type { Item } from '../ComboBox.svelte';

    let {
        value = $bindable(''),
        countryValue = $bindable('US'), // Set default country to US
        variant = 'primary',
        size = 'md' as 'md' | 'sm' | 'lg',
        disabled = false,
        required = false,
        error = false,
        placeholder = 'Enter phone number',
        label = '',
        class: className = ''
    } = $props();

    let selectedCountryItem = $state<Item | null>(null);
    let formattedValue = $state('');

    // Create items list for ComboBox
    const countryItems = countries.map(country => ({
        value: country.code,
        label: `${country.code}/${country.isoCode} (+${country.dialCode})`,
        selectedLabel: `${country.name} ${country.code}/${country.isoCode} (+${country.dialCode})`,
        icon: country.flag
    }));

    // Update selectedCountryItem immediately when countryValue changes
    $effect(() => {
        const selectedCountry = countryItems.find(item => item.value === countryValue);
        selectedCountryItem = selectedCountry ?? null;
        
        // Update formatted value when country changes
        if (selectedCountry && value) {
            const country = countries.find(c => c.code === countryValue);
            formattedValue = country ? `+${country.dialCode} ${value}` : value;
        }
    });

    // Update the formatted phone number when value or country changes
    $effect(() => {
        const country = countries.find(c => c.code === countryValue);
        if (country && value) {
            formattedValue = `+${country.dialCode} ${value}`;
        } else {
            formattedValue = value;
        }
    });

    const sizeClasses = {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12'
    };
</script>

<div class="relative w-full">
    {#if label}
        <label class="mb-2 block text-sm font-medium" for={label}>
            {label}
            {#if required}
                <span class="text-error">*</span>
            {/if}
        </label>
    {/if}

    <div class="flex gap-2">
        <div class="w-[180px]">
            <ComboBox
                items={countryItems}
                type="single"
                bind:value={countryValue}
                variant={variant as Variant}
                class={sizeClasses[size]}
                {disabled}
                placeholder="Select country"
            />
        </div>

        <div class="flex-1">
            <Input
                type="tel"
                bind:value
                variant={variant as Variant}
                {size}
                {disabled}
                {required}
                {error}
                {placeholder}
                class={cn('flex-1', className)}
                icon={selectedCountryItem?.icon ?? 'flat-color-icons:globe'}
            />
        </div>
    </div>

    {#if error && typeof error === 'string'}
        <p class="mt-1 text-sm text-error">{error}</p>
    {/if}

    {#if formattedValue}
        <p class="mt-1 text-sm text-neutral/70">
            Formatted: {formattedValue}
        </p>
    {/if}
</div>
