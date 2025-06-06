import { Suspense } from "react";
import { EventsList } from "@/components/events/EventsList";
import { EventsListSkeleton } from "@/components/events/EventsListSkeleton";

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList />
      </Suspense>
    </main>
  );
}
