<script lang="ts">
    import { cn } from '$lib/utility.js';
    import { Input } from './index.js';
    import ComboBox from '../ComboBox.svelte';
    import { countries } from './countries.js';

    interface Item {
        value: string;
        label: string;
        selectedLabel: string;
        icon: string;
    }
    import { 
        AsYouType,
        validatePhoneNumberLength,
        isValidPhoneNumber,
        type CountryCode 
    } from 'libphonenumber-js';

    let {
        value = $bindable(''),
        countryValue = $bindable('US'),
        variant = 'primary',
        size = 'md' as 'md' | 'sm' | 'lg',
        disabled = false,
        required = false,
        error = false,
        placeholder = 'Enter phone number',
        label = '',
        class: className = ''
    } = $props();

    let rawInput = $state('');
    let formattedValue = $state('');
    let validationError = $state('');
    let selectedCountryItem = $state<Item | null>(null);

    // Create items list for ComboBox
    const countryItems = countries.map(country => ({
        value: country.code,
        label: `${country.code}/${country.isoCode} (+${country.dialCode})`,
        selectedLabel: `${country.name} ${country.code}/${country.isoCode} (+${country.dialCode})`,
        icon: country.flag
    }));

    // Handle formatting and validation when input or country changes
    $effect(() => {
        const formatter = new AsYouType(countryValue as CountryCode);
        formattedValue = formatter.input(rawInput);
        
        const phoneNumber = formatter.getNumber();
        if (phoneNumber) {
            const isValid = validatePhoneNumber(phoneNumber.number);
            error = !isValid;
            value = isValid ? phoneNumber.number : value;
        } else {
            const isValid = validatePhoneNumber(undefined);
            error = !isValid;
            value = '';
        }
    });

    // Update selected country
    $effect(() => {
        selectedCountryItem = countryItems.find(item => item.value === countryValue) ?? null;
    });

    function validatePhoneNumber(phoneNumber: string | undefined) {
        if (!phoneNumber) {
            validationError = required ? 'Phone number is required' : '';
            return !required;
        }

        const validationResult = validatePhoneNumberLength(phoneNumber, countryValue as CountryCode);
        if (validationResult) {
            validationError = validationResult === 'TOO_SHORT' ? 'Phone number is too short' :
                            validationResult === 'TOO_LONG' ? 'Phone number is too long' :
                            'Invalid phone number length';
            return false;
        }

        if (!isValidPhoneNumber(phoneNumber, countryValue as CountryCode)) {
            validationError = 'Invalid phone number for selected country';
            return false;
        }

        validationError = '';
        return true;
    }

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
                bind:value={rawInput}
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

    {#if validationError}
        <p class="mt-1 text-sm text-error">{validationError}</p>
    {/if}

    {#if value}
        <p class="mt-1 text-sm text-neutral/70">
            {countryValue} Format: {formattedValue}
        </p>
    {/if}
</div>
