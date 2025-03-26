"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/types/events";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEventDetail } from "@/hooks/useEvents";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: eventDetail,
    isLoading,
    isError,
    error,
  } = useEventDetail(isOpen ? event.id : 0);

  const handleViewDetails = () => {
    if (pathname === "/events") {
      setIsOpen(true);
    } else {
      router.push("/events");
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg pt-0 pb-4">
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={event.imageUrl}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl line-clamp-1">{event.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleViewDetails}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Tickets</DialogTitle>
          </DialogHeader>

          {isLoading && (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {isError && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              {error instanceof Error
                ? error.message
                : "Failed to load event details"}
            </div>
          )}

          {eventDetail && !isLoading && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                  <Image
                    src={eventDetail.imageUrl}
                    alt={eventDetail.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{eventDetail.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {eventDetail.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(eventDetail.date)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">
                  Available Tickets
                </h4>
                {eventDetail.tickets && eventDetail.tickets.length > 0 ? (
                  <div className="space-y-4">
                    {eventDetail.tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="border rounded-lg p-4 flex gap-4"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={ticket.imageUrl}
                            alt={ticket.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <h5 className="font-medium">{ticket.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            Artist: {ticket.artist}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-semibold">
                              {formatCurrency(ticket.price)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {ticket.quantity} available
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    No tickets available for this event
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
