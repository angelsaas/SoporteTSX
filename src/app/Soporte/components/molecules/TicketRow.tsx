import React from 'react';
import { BiFolder } from 'react-icons/bi';
import { Ticket } from '../types/TicketTypes';
import StatusBadge from '../atoms/StatusBadge';
import { translateStatus } from '../../utils/statusUtils'; 

interface TicketRowProps {
  ticket: Ticket;
  expandedTicketId: string | null;
  handleTicketClick: (id: string) => void;
  handleEvidenceClick: (e: React.MouseEvent) => void;
  handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCommentSubmit: (ticketId: string) => void;
  newComment: string;
  errorMessage: string | null; 
}

const TicketRow: React.FC<TicketRowProps> = ({
  ticket,
  expandedTicketId,
  handleTicketClick,
  handleEvidenceClick,
  handleCommentChange,
  handleCommentSubmit,
  newComment,
  errorMessage,
}) => {
  const creationDate = ticket.historial.length > 0 ? new Date(ticket.historial[0].fecha).toLocaleDateString() : 'N/A';
  const lastUpdateDate = ticket.estado?.fecha ? new Date(ticket.estado.fecha).toLocaleDateString() : 'N/A';

  return (
    <>
      <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => handleTicketClick(ticket._id)}>
        <td className="py-2 px-4 border-b">{ticket._id.slice(0, 6)}</td>
        <td className="py-2 px-4 border-b">{ticket.descripcion}</td>
        <td className="py-2 px-4 border-b">
          <StatusBadge status={translateStatus(ticket.estado?.estado || '')} />
        </td>
        <td className="py-2 px-4 border-b">
          <button onClick={handleEvidenceClick}>
            <BiFolder className="text-xl" />
          </button>
        </td>
        <td className="py-2 px-4 border-b">{creationDate}</td> 
        <td className="py-2 px-4 border-b">{lastUpdateDate}</td>
      </tr>
      {expandedTicketId === ticket._id && (
        <tr>
          <td colSpan={6} className="py-2 px-4 bg-gray-50">
            <div className="mt-2">
              <h3 className="font-semibold">Comentarios:</h3>
              {ticket.comentarios?.map((comment, index) => (
                <div key={index} className="p-2 border-b">
                  <span className="font-semibold">Comentario:</span> {comment.mensaje} <br />
                  <span className="text-gray-500">{new Date(comment.fecha).toLocaleDateString()}</span>
                </div>
              ))}
              <textarea
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={handleCommentChange}
              />
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                onClick={() => handleCommentSubmit(ticket._id)}
              >
                Enviar
              </button>
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TicketRow;
