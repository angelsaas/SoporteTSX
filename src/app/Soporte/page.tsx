'use client';
import React, { useState, useEffect } from 'react';
import { getTickets, postComment } from '../Soporte/services/apiService';
import { Ticket } from '../Soporte/components/types/TicketTypes';
import TicketTable from '../Soporte/components/organisms/TicketTable';
import AddTicketModal from '../Soporte/components/molecules/AddTicketModal';

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getTickets();
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketClick = (id: string) => {
    setExpandedTicketId(expandedTicketId === id ? null : id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (ticketId: string) => {
    try {
      await postComment(ticketId, newComment);
      const updatedTickets = tickets.map(ticket => {
        if (ticket._id === ticketId) {
          const newCommentObj = {
            idusuario: "current_user_id", 
            mensaje: newComment,
            fecha: new Date().toISOString(),
            _id: Math.random().toString(36).substring(7),
          };
          return {
            ...ticket,
            comentarios: [...(ticket.comentarios || []), newCommentObj],
          };
        }
        return ticket;
      });
      setTickets(updatedTickets);
      setNewComment('');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error posting comment:', error);
      setErrorMessage('Comentario no enviado');
    }
  };

  const handleAddTicket = (newTicket: Ticket) => {
    setTickets([newTicket, ...tickets]);
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket._id.toString().includes(searchTerm) ||
    ticket.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Soporte</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Nuevo ticket
          </button>
        </div>
        <input
          type="text"
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          placeholder="Buscar ticket por ID o descripción"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <p className="text-gray-600">Total {filteredTickets.length} tickets</p>

        <TicketTable
          tickets={filteredTickets}
          expandedTicketId={expandedTicketId}
          handleTicketClick={handleTicketClick}
          handleCommentChange={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
          newComment={newComment}
          errorMessage={errorMessage}
        />
      </div>
      <AddTicketModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddTicket={handleAddTicket}
      />
    </div>
  );
}
