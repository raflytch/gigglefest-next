import api from "@/lib/api";
import { Event, EventsResponse } from "@/types/events";

export const eventService = {
  getEvents: async (
    page: number = 1,
    limit: number = 6
  ): Promise<EventsResponse> => {
    try {
      const response = await api.get(`/events?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },
};
