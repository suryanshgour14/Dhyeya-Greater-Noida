import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // navigator.locks throws "lock stolen" errors when multiple concurrent
        // auth calls race (common in dev with React StrictMode). Use a simple
        // in-memory passthrough to avoid this without breaking auth state.
        lock: async (_name, _acquireTimeout, fn) => fn(),
      },
    }
  );
}
