// ══════════════════════════════════════════════════════
// COMPONENT: HomePage (page.js)
// PURPOSE: The root page of the Next.js App Router. Its
//          only job is to render TaskBoard inside a main
//          element. All state, logic, and interactivity
//          live inside TaskBoard — this file stays as
//          thin as possible by design.
// TYPE: Server Component — no 'use client' directive needed
//       because this file has no hooks, no event handlers,
//       and no browser-only APIs. Next.js renders it on
//       the server and sends static HTML to the browser.
//       TaskBoard declares its own 'use client' boundary.
// PROPS: None — Next.js calls this component automatically
//        when the user visits the root route (/).
// ══════════════════════════════════════════════════════

import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    // <main> is a semantic HTML landmark that screen readers
    // use to identify the primary content of the page.
    // min-h-screen ensures the Neumorphic background color
    // set in layout.js covers the full viewport height even
    // when the task list is short.
    <main className="p-4 min-h-screen">
      {/* TaskBoard is the sole child. It owns all state and
          renders the full app UI inside itself. Keeping
          page.js this thin means the App Router can handle
          loading states, error boundaries, and metadata at
          the page level without interfering with app logic. */}
      <TaskBoard />
    </main>
  );
}