import React, { useState } from 'react';
import { Ticket } from '../types';
import TicketRow from '../molecules/TicketRow';

interface TicketTableProps {
  tickets: Ticket[];
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, searchTerm, onSearchChange }) => {
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState<string>('');

  const handleTicketClick = (id: number) => {
    setExpandedTicketId(expandedTicketId === id ? null : id);
    setExpandedEvidenceId(null);
  };

  const handleEvidenceClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedEvidenceId(expandedEvidenceId === id ? null : id);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (ticketId: number) => {
    console.log(`Nuevo comentario para el ticket ${ticketId}: ${newComment}`);
    setNewComment('');
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.id.toString().includes(searchTerm) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        className="w-full mb-3 p-2 border border-gray-300 rounded"
        placeholder="Buscar ticket por ID o descripción"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <p className="text-gray-600">Total {filteredTickets.length} tickets</p>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-a">Ticket ID</th>
            <th className="py-2 px-4 border-a">Descripción</th>
            <th className="py-2 px-4 border-a">Status</th>
            <th className="py-2 px-4 border-a">Evidencia</th>
            <th className="py-2 px-4 border-a">Última actualización</th>
            <th className="py-2 px-4 border-a">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map(ticket => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              onTicketClick={handleTicketClick}
              onEvidenceClick={handleEvidenceClick}
              isExpanded={expandedTicketId === ticket.id}
              newComment={newComment}
              onCommentChange={handleCommentChange}
              onCommentSubmit={handleCommentSubmit}
            />
          ))}
        </tbody>
      </table>
      {expandedEvidenceId !== null && (
        <aside className="fixed top-0 right-0 w-1/3 h-full bg-gray-200 shadow-lg p-4 overflow-y-auto">
          <button onClick={() => setExpandedEvidenceId(null)} className="text-red-500 mb-4">Cerrar</button>
          <h2 className="text-xl font-bold mb-4">Evidencias del Ticket {expandedEvidenceId}</h2>
          {tickets.find(ticket => ticket.id === expandedEvidenceId)?.evidences.length ? (
            tickets.find(ticket => ticket.id === expandedEvidenceId)?.evidences.map(evidence => (
              <div key={evidence.id} className="mb-4">
                <a href={evidence.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  {evidence.name}
                </a>
              </div>
            ))
          ) : (
            <p>No hay evidencias disponibles para este ticket.</p>
          )}
        </aside>
      )}
    </>
  );
};

export default TicketTable;
