export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
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
