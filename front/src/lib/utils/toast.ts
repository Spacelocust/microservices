import { toast as defaultToast } from '@zerodevx/svelte-toast';

const success = (m: string) =>
  defaultToast.push(m, {
    theme: {
      '--toastBackground': 'green',
      '--toastColor': 'white',
      '--toastBarBackground': 'white',
    },
  });

const error = (m: string) =>
  defaultToast.push(m, {
    theme: {
      '--toastBackground': 'red',
      '--toastColor': 'white',
      '--toastBarBackground': 'white',
    },
  });

const info = (m: string) =>
  defaultToast.push(m, {
    theme: {
      '--toastBackground': 'blue',
      '--toastColor': 'white',
      '--toastBarBackground': 'white',
    },
  });

const warning = (m: string) =>
  defaultToast.push(m, {
    theme: {
      '--toastBackground': 'yellow',
      '--toastColor': 'black',
      '--toastBarBackground': 'white',
    },
  });

export const toast = {
  success,
  error,
  info,
  warning,
};
