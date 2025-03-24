import { Suspense } from "react";
import { EventsList } from "@/components/events/EventsList";
import { EventsListSkeleton } from "@/components/events/EventsListSkeleton";

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList />
      </Suspense>
    </main>
  );
}
