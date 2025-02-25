import { toast as svelteToast } from '@zerodevx/svelte-toast';
import type { SvelteToastOptions } from '@zerodevx/svelte-toast';
import { getIcon, loadIcon } from '@iconify/svelte';

interface ToastTheme {
  '--toastBackground': string;
  '--toastColor': string;
  [key: string]: string;
}

const variantThemes: Record<Variant, ToastTheme> = {
  primary: {
    '--toastBackground': 'var(--color-primary)',
    '--toastColor': 'black'
  },
  secondary: {
    '--toastBackground': 'var(--color-secondary)',
    '--toastColor': 'black'
  },
  tertiary: {
    '--toastBackground': 'var(--color-tertiary)',
    '--toastColor': 'black'
  },
  accent: {
    '--toastBackground': 'var(--color-accent)',
    '--toastColor': 'black'
  },
  muted: {
    '--toastBackground': 'var(--color-muted)',
    '--toastColor': 'black'
  },
  error: {
    '--toastBackground': 'var(--color-error)',
    '--toastColor': 'black'
  },
  success: {
    '--toastBackground': 'var(--color-success)',
    '--toastColor': 'black'
  },
  warning: {
    '--toastBackground': 'var(--color-warning)',
    '--toastColor': 'black'
  },
  info: {
    '--toastBackground': 'var(--color-info)',
    '--toastColor': 'black'
  },
  default: {
    '--toastBackground': 'var(--color-default)',
    '--toastColor': 'black'
  },
  danger: {
    '--toastBackground': 'var(--color-danger)',
    '--toastColor': 'black'
  },
  light: {
    '--toastBackground': 'var(--color-light)',
    '--toastColor': 'black'
  },
  dark: {
    '--toastBackground': 'var(--color-dark)',
    '--toastColor': 'white'
  }
};

const variantIcons: Record<Variant, string> = {
  primary: 'mdi:bell',
  secondary: 'mdi:information',
  tertiary: 'mdi:star',
  accent: 'mdi:flag',
  muted: 'mdi:bell-off',
  error: 'mdi:alert',
  success: 'mdi:check-circle',
  warning: 'mdi:alert-circle',
  info: 'mdi:information-circle',
  default: 'mdi:bell',
  danger: 'mdi:alert',
  light: 'mdi:white-balance-sunny',
  dark: 'mdi:weather-night'
};

interface ToastOptions extends Partial<SvelteToastOptions> {
  variant?: Variant;
  icon?: string;
}

async function getSvgFromIconData(iconName: string): Promise<string> {
  let iconData = getIcon(iconName);
  
  if (!iconData) {
    try {
      iconData = await loadIcon(iconName);
    } catch (err) {
      console.warn(`Failed to load icon: ${iconName}`, err);
      return '';
    }
  }
  
  const { body, width, height } = iconData;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 ${width} ${height}">
    ${body}
  </svg>`;
}

async function createToast(msg: string, options: ToastOptions = {}) {
  const variant = options.variant || 'primary';
  const icon = options.icon || variantIcons[variant];
  const theme = { ...variantThemes[variant], ...(options.theme || {}) };

  const svgIcon = await getSvgFromIconData(icon);
  const message = `<div style="display: flex; align-items: center; gap: 0.5rem; margin: -.5rem;">
    ${svgIcon}
    <span>${msg}</span>
  </div>`;

  return svelteToast.push(message, { ...options, theme });
}

export const toast = {
  ...svelteToast,
  primary: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'primary' }),
  secondary: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'secondary' }),
  tertiary: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'tertiary' }),
  accent: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'accent' }),
  muted: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'muted' }),
  error: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'error' }),
  success: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'success' }),
  warning: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'warning' }),
  info: async (msg: string, opts?: ToastOptions) => await createToast(msg, { ...opts, variant: 'info' }),
  promise: async <T>(
    promise: Promise<T>,
    {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Error occurred',
      ...opts
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((err: any) => string);
    } & ToastOptions = {}
  ) => {
    const toastId = await createToast(loading, { ...opts, variant: 'info', dismissable: false });
    try {
      const data = await promise;
      const successMessage = typeof success === 'function' ? success(data) : success;
      svelteToast.pop(toastId);
      await createToast(successMessage, { ...opts, variant: 'success' });
      return data;
    } catch (err) {
      const errorMessage = typeof error === 'function' ? error(err) : error;
      svelteToast.pop(toastId);
      await createToast(errorMessage, { ...opts, variant: 'error' });
      throw err;
    }
  },
  custom: async (msg: string, opts?: ToastOptions) => await createToast(msg, opts)
};
