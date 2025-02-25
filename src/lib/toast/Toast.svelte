<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { cn } from '$lib/utility.js';

  let {
    options = {
      duration: 4000,
      pausable: true,
      dismissable: true,
      reversed: false,
      intro: { x: 256 }
    }
  } = $props();

  // Override default styles with clay design
  const defaultTheme = {
    '--toastBackground': 'var(--clay-background)',
    '--toastColor': 'var(--color-text)',
    '--toastBorderRadius': 'var(--clay-border-radius)',
    '--toastBoxShadow': 'var(--clay-shadow-outset), inset var(--clay-shadow-inset-primary), inset var(--clay-shadow-inset-secondary)',
    '--toastPadding': '1rem',
    '--toastMargin': '0 0 1rem 0',
    '--toastWidth': '20rem',
    '--toastBarHeight': '8px',
    '--toastBarBackground': 'var(--color-muted)',
    '--toastContainerRight': '2rem',
    '--toastContainerTop': '2rem',
    '--toastBtnWidth': '2.5rem',
    '--toastBtnHeight': '2.5rem',
    '--toastMsgPadding': '1rem'
  };

  options.theme = { ...defaultTheme, ...(options.theme || {}) };
</script>

<SvelteToast {options} />

<style>
  :global(._toastItem) {
    transition: all 0.2s ease-in-out;
    backdrop-filter: blur(8px);
  }

  :global(._toastItem:hover) {
    transform: translateY(-2px);
    box-shadow: var(--clay-shadow-outset), 
                inset var(--clay-shadow-inset-primary), 
                inset var(--clay-shadow-inset-secondary);
  }

  :global(._toastBtn) {
    opacity: 0.7;
    transition: opacity 0.2s;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--clay-background);
    box-shadow: var(--clay-shadow-outset);
    margin: 0.5rem;
  }

  :global(._toastBtn:hover) {
    opacity: 1;
    box-shadow: inset var(--clay-shadow-outset),
                var(--clay-shadow-inset-primary),
                var(--clay-shadow-inset-secondary);
  }

  :global(._toastMsg) {
    font-family: var(--font-sans);
  }

  :global(._toastBar) {
    border-radius: var(--clay-border-radius);
    margin: 0 1rem 0.5rem 1rem;
    width: calc(100% - 2rem) !important;
    box-shadow: inset var(--clay-shadow-outset),
                var(--clay-shadow-inset-primary),
                var(--clay-shadow-inset-secondary);
  }
</style>
