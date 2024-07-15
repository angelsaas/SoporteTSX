import axios from 'axios';
import { Ticket } from '../components/types/TicketTypes';

const apiClient = axios.create({
  baseURL: 'https://apisoporte.datsmanager.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await apiClient.get('/ticket');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets', error);
    throw error;
  }
};

export const postComment = async (ticketId: string, comment: string) => {
  try {
    const response = await apiClient.post(`/ticket/${ticketId}/comment`, { comment });
    return response.data;
  } catch (error) {
    console.error('Error posting comment', error);
    throw error;
  }
};
