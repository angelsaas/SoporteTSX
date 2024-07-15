import React from 'react';
import { Comment, Evidence } from '../types/TicketTypes';

interface EvidenceAsideProps {
  isOpen: boolean;
  onClose: () => void;
  evidences: Evidence[];
  comments: Comment[];
}

const EvidenceAside: React.FC<EvidenceAsideProps> = ({
  isOpen,
  onClose,
  evidences,
  comments,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 w-1/3 h-full bg-gray-200 shadow-lg p-4 overflow-y-auto">
      <button onClick={onClose} className="text-red-500 mb-4">Cerrar</button>
      <h2 className="text-xl font-bold mb-4">Evidencias</h2>
      {evidences.length > 0 ? (
        evidences.map((evidence) => (
          <div key={evidence._id} className="mb-4">
            <a href={evidence.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              {evidence.descripcion}
            </a>
            <p>{evidence.fecha}</p>
          </div>
        ))
      ) : (
        <p>No hay evidencias disponibles.</p>
      )}

      <h2 className="text-xl font-bold mb-4">Comentarios</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="mb-4">
            <p>{comment.mensaje}</p>
            <p className="text-gray-500">{comment.fecha}</p>
          </div>
        ))
      ) : (
        <p>No hay comentarios disponibles.</p>
      )}
    </aside>
  );
};

export default EvidenceAside;
