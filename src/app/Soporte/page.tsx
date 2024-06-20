"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './soporte.module.css'; 
import Link from 'next/link'; // Importa el componente Link de Next.js

interface Ticket {
  id: number;
  description: string;
  status: 'En revisión' | 'Resuelto' | 'Pendiente';
  lastUpdate: string;
  creationDate: string;
}

export default function Page() {
  const [buttonClass, setButtonClass] = useState('');

  const handleButtonClick = () => {
    setButtonClass(styles['button-clicked']);
    setTimeout(() => setButtonClass(''), 300);
  };

  const tickets: Ticket[] = [
    { id: 3012, description: 'Error al mostrar fecha en inventario', status: 'En revisión', lastUpdate: 'Hace 16 horas', creationDate: 'Febrero 24 2023 14:00:00' },
    { id: 3013, description: 'Problema con el inventario', status: 'Resuelto', lastUpdate: 'Hace 17 horas', creationDate: 'Febrero 25 2023 14:00:00' },
    { id: 3014, description: 'Error al iniciar sesión', status: 'Pendiente', lastUpdate: 'Hace 18 horas', creationDate: 'Febrero 26 2023 14:00:00' },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Soporte</h2>
        <Link href="/addTicket">
          <button className={`btn btn-primary ${buttonClass}`} onClick={handleButtonClick}>
            Nuevo ticket
          </button>
        </Link>
      </div>
      <input type="text" className="form-control mb-3" placeholder="Buscar ticket" />
      <p className="text-muted">Total {tickets.length} tickets</p>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Ticket ID</th>
            <th>Descripción</th>
            <th>Status</th>
            <th>Evidencia</th>
            <th>Última actualización</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.description}</td>
              <td>
                <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                  {ticket.status}
                </span>
              </td>
              <td><i className="bi bi-folder-fill"></i></td> 
              <td>{ticket.lastUpdate}</td>
              <td>{ticket.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <div className="p-2 bg-light border">
          <span className="font-weight-bold">Usuario:</span> Hola, estoy teniendo problemas para iniciar sesión.
        </div>
        <div className="p-2 bg-light border mt-2">
          <span className="font-weight-bold">Agente:</span> ¿Podrías darme más detalles sobre el error?
        </div>
        <div className="p-2 bg-light border mt-2">
          <span className="font-weight-bold">Usuario:</span> Me aparece un mensaje que dice "Credenciales inválidas".
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'En revisión':
      return styles['badge-en-revision']; 
    case 'Resuelto':
      return styles['badge-resuelto'];
    case 'Pendiente':
      return styles['badge-pendiente']; 
    default:
      return 'badge-secondary'; 
  }
}
