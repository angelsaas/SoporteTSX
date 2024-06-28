import React from 'react';
import { BiFolder } from 'react-icons/bi';
import StatusBadge from '../atoms/StatusBadge';
import { Ticket } from '../types';

interface TicketRowProps {
  ticket: Ticket;
  onTicketClick: (id: number) => void;
  onEvidenceClick: (id: number, e: React.MouseEvent) => void;
  isExpanded: boolean;
  newComment: string;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCommentSubmit: (ticketId: number) => void;
}

const TicketRow: React.FC<TicketRowProps> = ({
  ticket,
  onTicketClick,
  onEvidenceClick,
  isExpanded,
  newComment,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <>
      <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => onTicketClick(ticket.id)}>
        <td className="py-2 px-4 border-b">{ticket.id}</td>
        <td className="py-2 px-4 border-b">{ticket.description}</td>
        <td className="py-2 px-4 border-b">
          <StatusBadge status={ticket.status} />
        </td>
        <td className="py-2 px-4 border-b">
          <button onClick={(e) => onEvidenceClick(ticket.id, e)}>
            <BiFolder className="text-xl" />
          </button>
        </td>
        <td className="py-2 px-4 border-b">{ticket.lastUpdate}</td>
        <td className="py-2 px-4 border-b">{ticket.creationDate}</td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={6} className="py-2 px-4 bg-gray-50">
            <div className="mt-2">
              {ticket.comments.map((comment, index) => (
                <div key={index} className="p-2 border-b">
                  <span className="font-semibold">{comment.user}:</span> {comment.message} <br />
                  <span className="text-gray-500">{comment.date}</span>
                </div>
              ))}
              <textarea
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={onCommentChange}
              />
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                onClick={() => onCommentSubmit(ticket.id)}
              >
                Enviar
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TicketRow;
