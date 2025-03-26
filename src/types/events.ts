export interface Ticket {
  id: number;
  name: string;
  price: number;
  quantity: number;
  userId: number;
  eventId: number;
  categoryId: number;
  imageUrl: string;
  artist: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  tickets?: Ticket[];
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EventsResponse {
  status: string;
  message: string;
  data: {
    events: Event[];
    meta: Meta;
  };
}
