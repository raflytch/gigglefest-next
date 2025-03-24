import { EventCard } from "./EventCard";
import { ErrorDisplay } from "./ErrorDisplay";
import { eventService } from "@/services/eventService";

export async function EventsList() {
  try {
    const eventsResponse = await eventService.getEvents();
    const events = eventsResponse.data.events;

    if (!events || events.length === 0) {
      return <div className="text-center py-12">No events found</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  } catch (error) {
    return <ErrorDisplay />;
  }
}
