import React, { useState } from 'react';
import Modal from 'react-modal';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login"
      className="fixed inset-0 flex items-center justify-center z-50 outline-none focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b text-center">
          <img
            src="/imagenes/undraw_team_spirit_re_yl1v 1.png"
            alt="Team Spirit"
            className="w-32 h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-6 font-inter text-gray-900">Soporte Dats Manager</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Label text="Usuario" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
              />
            </div>
            <div className="mb-6">
              <Label text="Contraseña" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button text="Iniciar Sesión" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
