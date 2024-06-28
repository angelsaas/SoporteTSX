"use client";
import React, { useState } from 'react';
import TicketTable from './components/organisms/TicketTable';
import { Ticket } from './components/types';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
        <TicketTable tickets={tickets} searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
    </div>
  );
}
