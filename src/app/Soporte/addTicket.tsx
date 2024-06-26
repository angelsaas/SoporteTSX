import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function addTicket() {
  return (
    <div className="container mt-4">
      <h2>Nuevo Ticket</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input type="text" className="form-control" id="description" placeholder="Descripción del problema" />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Estado</label>
          <select className="form-select" id="status">
            <option value="En revisión">En revisión</option>
            <option value="Resuelto">Resuelto</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Crear Ticket</button>
      </form>
    </div>
  );
}

export default addTicket;
