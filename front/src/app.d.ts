// See https://kit.svelte.dev/docs/types#app

import type { User } from '$api/stubs/user/v1alpha/message';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
    }
    interface PageData {
      flash?: { type: 'success' | 'error'; message: string };
    }
    // interface Platform {}
  }
}

export {};
