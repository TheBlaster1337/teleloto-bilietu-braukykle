import React, { useState, useRef } from 'react';
import { useTickets } from '../context/TicketContext';
import { Ticket } from '../types';
import { Upload } from 'lucide-react';

const FileUploader: React.FC = () => {
  const { setTickets } = useTickets();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const validateTicketData = (data: any): data is Ticket[] => {
    if (!Array.isArray(data)) return false;
    
    return data.every(ticket => 
      typeof ticket.id === 'string' && 
      Array.isArray(ticket.numbers) &&
      ticket.numbers.every(row => Array.isArray(row) && row.every(num => typeof num === 'number'))
    );
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target && typeof event.target.result === 'string') {
          const data = JSON.parse(event.target.result);
          
          if (validateTicketData(data)) {
            setTickets(data);
            setError(null);
          } else {
            setError('Neteisingas informacijos formatas.');
          }
        }
      } catch (err) {
        setError('Nepavyko apdoroti failo. Įsitikinkite, kad tai yra tinkamas JSON formatas.');
      }
    };
    
    reader.onerror = () => {
      setError('Nepavyko perskaityti failo. Patikrinkite, ar failas yra prieinamas ir teisingas.');
    };
    
    reader.readAsText(file);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          isDragging ? 'border-accent-500 bg-dark-800' : 'border-dark-600 hover:border-dark-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-dark-400 mb-3" />
        <p className="text-lg font-medium text-dark-200 mb-2">
          Įkelkite JSON failą su bilietais
        </p>
        <p className="text-sm text-dark-400 mb-4">arba</p>
        <button
          type="button"
          onClick={handleBrowseClick}
          className="px-4 py-2 bg-accent-600 text-dark-50 rounded-md hover:bg-accent-700 transition-colors"
        >
          Naršyti failus
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      {error && (
        <div className="mt-3 text-red-400 text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUploader;