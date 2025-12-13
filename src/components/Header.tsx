import React from 'react';
import { Ticket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-accent-900 to-accent-800 text-dark-50 py-6 px-4 shadow-lg border-b border-dark-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Ticket className="w-8 h-8 mr-3 text-accent-300" />
          <h1 className="text-2xl font-bold">Teleloto Bilietų Braukyklė</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;