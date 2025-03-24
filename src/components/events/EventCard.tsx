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
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
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
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}
