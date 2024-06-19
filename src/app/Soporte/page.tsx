import React from 'react';
import styles from './soporte.module.css';

interface Ticket {
  id: number;
  description: string;
  status: 'En revisión' | 'Resuelto' | 'Pendiente'; 
  lastUpdate: string;
  creationDate: string;
}

export default function Page() { 
  const tickets: Ticket[] = [
    { id: 3012, description: 'Error al mostrar fecha en inventario', status: 'En revisión', lastUpdate: 'Hace 16 horas', creationDate: 'Febrero 24 2023 14:00:00' },

  
  ];

  return (
    <div className={styles.supportContainer}>
      <h2 className={styles.title}>Soporte</h2>
      <input type="text" className={styles.searchInput} placeholder="Buscar ticket" />
      <p className={styles.totalTickets}>Total {tickets.length} tickets</p>

      <table className={styles.ticketTable}>
        <thead>
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
                <span className={`${styles.status} ${styles[`status-${ticket.status.toLowerCase()}`]}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{/* Icono de evidencia */}</td>
              <td>{ticket.lastUpdate}</td>
              <td>{ticket.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.chatSection}>
        {/* Mensajes del chat */}
      </div>
    </div>
  );
}
