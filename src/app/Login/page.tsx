"use client";
import React, { useState } from 'react';
import LoginModal from '../Login/organisms/LoginModal';

const LoginPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleLoginSubmit = (username: string, password: string) => {
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        onSubmit={handleLoginSubmit} 
      />
    </div>
  );
};

export default LoginPage;
