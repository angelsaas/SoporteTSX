"use client"
import React, { useState } from 'react';
import { BiFolder } from 'react-icons/bi'; 


interface Comment {
  user: string;
  message: string;
  date: string;
}

interface Evidence {
  id: number;
  name: string;
  url: string;
}

interface Ticket {
  id: number;
  description: string;
  status: 'En revisión' | 'Resuelto' | 'Pendiente';
  lastUpdate: string;
  creationDate: string;
  comments: Comment[];
  evidences: Evidence[];
}

export default function Page() {
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);
  const [expandedEvidenceId, setExpandedEvidenceId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleTicketClick = (id: number) => {
    setExpandedTicketId(expandedTicketId === id ? null : id);
    setExpandedEvidenceId(null);
  };

  const handleEvidenceClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedEvidenceId(expandedEvidenceId === id ? null : id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const tickets: Ticket[] = [
    {
      id: 3012,
      description: 'Error al mostrar fecha en inventario',
      status: 'En revisión',
      lastUpdate: 'Hace 16 horas',
      creationDate: 'Febrero 24 2023 14:00:00',
      comments: [
        { user: 'Usuario', message: 'Hola, estoy teniendo problemas para iniciar sesión.', date: 'Febrero 24 2023 15:00:00' },
        { user: 'Agente', message: '¿Podrías darme más detalles sobre el error?', date: 'Febrero 24 2023 16:00:00' },
      ],
      evidences: [
        { id: 1, name: 'Screenshot1.png', url: '/path/to/screenshot1.png' },
        { id: 2, name: 'skibidi.txt', url: '/path/to/skibidi.txt' },
      ],
    },
    {
      id: 3013,
      description: 'Problema con el inventario',
      status: 'Resuelto',
      lastUpdate: 'Hace 17 horas',
      creationDate: 'Febrero 25 2023 14:00:00',
      comments: [
        { user: 'Usuario', message: 'El inventario no se actualiza.', date: 'Febrero 25 2023 15:00:00' },
        { user: 'Agente', message: 'Hemos resuelto el problema.', date: 'Febrero 25 2023 16:00:00' },
      ],
      evidences: [
        { id: 1, name: 'toilet.png', url: '/path/to/toilet.png' },
      ],
    },
    {
      id: 3014,
      description: 'Error al iniciar sesión',
      status: 'Pendiente',
      lastUpdate: 'Hace 18 horas',
      creationDate: 'Febrero 26 2023 14:00:00',
      comments: [
        { user: 'Usuario', message: 'Me aparece un mensaje que dice "Credenciales inválidas".', date: 'Febrero 26 2023 15:00:00' },
      ],
      evidences: [],
    },
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.id.toString().includes(searchTerm) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Soporte</h2>
          <a
            href="/addTicket"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Nuevo ticket
          </a>
        </div>
        <input
          type="text"
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          placeholder="Buscar ticket por ID o descripción"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <p className="text-gray-600">Total {filteredTickets.length} tickets</p>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Ticket ID</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Evidencia</th>
              <th className="py-2 px-4 border-b">Última actualización</th>
              <th className="py-2 px-4 border-b">Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(ticket => (
              <React.Fragment key={ticket.id}>
                <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => handleTicketClick(ticket.id)}>
                  <td className="py-2 px-4 border-b">{ticket.id}</td>
                  <td className="py-2 px-4 border-b">{ticket.description}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`inline-block px-2 py-1 rounded ${getStatusBadgeClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={(e) => handleEvidenceClick(ticket.id, e)}>
                      <BiFolder className="text-xl" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{ticket.lastUpdate}</td>
                  <td className="py-2 px-4 border-b">{ticket.creationDate}</td>
                </tr>
                {expandedTicketId === ticket.id && (
                  <tr>
                    <td colSpan={6} className="py-2 px-4 bg-gray-50">
                      <div className="mt-2">
                        {ticket.comments.map((comment, index) => (
                          <div key={index} className="p-2 border-b">
                            <span className="font-semibold">{comment.user}:</span> {comment.message} <br />
                            <span className="text-gray-500">{comment.date}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
      </div>
    </div>
  );
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'En revisión':
      return 'bg-yellow-500 text-white';
    case 'Resuelto':
      return 'bg-green-500 text-white';
    case 'Pendiente':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}
