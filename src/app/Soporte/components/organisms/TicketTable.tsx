import React, { useState } from 'react';
import { Ticket, Comment } from '../types/TicketTypes';
import TicketRow from '../molecules/TicketRow';
import EvidenceAside from '../molecules/EvidenceAside';
import AddTicketModal from '../molecules/AddTicketModal'; // Importa el nuevo modal

interface TicketTableProps {
  tickets: Ticket[];
  expandedTicketId: string | null;
  handleTicketClick: (id: string) => void;
  handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCommentSubmit: (ticketId: string) => void;
  newComment: string;
  errorMessage: string | null;
}

const TicketTable: React.FC<TicketTableProps> = ({
  tickets,
  expandedTicketId,
  handleTicketClick,
  handleCommentChange,
  handleCommentSubmit,
  newComment,
  errorMessage,
}) => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(false);
  const [currentEvidences, setCurrentEvidences] = useState<Ticket['evidencia']>([]);
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para el modal

  const handleEvidenceClick = (ticket: Ticket, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentEvidences(ticket.evidencia);
    setCurrentComments(ticket.comentarios || []);
    setAsideOpen(true);
  };

  const handleAddTicket = (newTicket: Ticket) => {
    console.log('Nuevo ticket añadido:', newTicket);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Añadir Ticket</button> 
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-a">Ticket ID</th>
            <th className="py-2 px-4 border-a">Descripción</th>
            <th className="py-2 px-4 border-a">Estado</th>
            <th className="py-2 px-4 border-a">Evidencia</th>
            <th className="py-2 px-4 border-a">Última actualización</th>
            <th className="py-2 px-4 border-a">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <TicketRow
              key={ticket._id}
              ticket={ticket}
              expandedTicketId={expandedTicketId}
              handleTicketClick={handleTicketClick}
              handleEvidenceClick={(e) => handleEvidenceClick(ticket, e)}
              handleCommentChange={handleCommentChange}
              handleCommentSubmit={handleCommentSubmit}
              newComment={newComment}
              errorMessage={errorMessage}
            />
          ))}
        </tbody>
      </table>
      <EvidenceAside
        isOpen={isAsideOpen}
        onClose={() => setAsideOpen(false)}
        evidences={currentEvidences}
        comments={currentComments}
      />
      <AddTicketModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAddTicket={handleAddTicket}
      />
    </>
  );
};

export default TicketTable;
