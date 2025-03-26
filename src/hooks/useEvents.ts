import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/services/eventService";
import { Event } from "@/types/events";

export function useEvents(page = 1, limit = 6) {
  return useQuery({
    queryKey: ["events", page, limit],
    queryFn: () => eventService.getEvents(page, limit),
    select: (data) => data.data,
  });
}

export function useEventDetail(eventId: number) {
  return useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: async () => {
      const response = await eventService.getEvents(1, 5);
      const event = response.data.events.find((e: Event) => e.id === eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      return event;
    },
    enabled: !!eventId,
  });
}
