import React, { useState } from 'react';
import Modal from 'react-modal';
import { Ticket } from '../types/TicketTypes';

interface AddTicketModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddTicket: (ticket: Ticket) => void;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({ isOpen, onRequestClose, onAddTicket }) => {
  const [descripcion, setDescripcion] = useState('');
  const [evidencia, setEvidencia] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidencia(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const newTicket: Ticket = {
      _id: new Date().toISOString(),
      descripcion,
      evidencia: evidencia ? [{ _id: new Date().toISOString(), url: URL.createObjectURL(evidencia), fecha: new Date().toISOString() }] : [],
      historial: [],
      estado: { idusuario: '', estado: 'pendiente', mensaje: '', fecha: new Date().toISOString(), _id: new Date().toISOString() },
      comentarios: [],
    };
    onAddTicket(newTicket);
    onRequestClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Añadir Ticket" 
      className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-1/3 max-h-full overflow-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold mb-4">Añadir Ticket</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
              <input 
                type="text" 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Evidencia:</label>
              <div className="flex items-center">
                <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                  Seleccionar Archivos (jpeg, png, jpg)
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/jpg" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                </label>
                {evidencia ? (
                  <span className="ml-4 text-gray-700">{evidencia.name}</span>
                ) : (
                  <span className="ml-4 text-gray-500">Ningún Archivo Seleccionado</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button 
                type="button" 
                onClick={handleSubmit} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Añadir Ticket
              </button>
              <button 
                type="button" 
                onClick={onRequestClose} 
                className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTicketModal;
