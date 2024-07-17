import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="flex flex-col items-center">
      <img src="/imagenes/undraw_team_spirit_re_yl1v 1.png" alt="Team Spirit" className="w-1/3 mb-4" />
      <h1 className="text-2xl font-bold mb-6 font-inter">Soporte Dats Manager</h1>
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
  );
};

export default LoginForm;
