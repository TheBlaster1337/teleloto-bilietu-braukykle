import React from 'react';
import { Ticket } from '../types';
import { useTickets } from '../context/TicketContext';
import { Download } from 'lucide-react';

const ExampleTicket: React.FC = () => {
  const { setTickets } = useTickets();

  const exampleTicket: Ticket[] = [
    {
      id: "012345",
      numbers: [
        [1, 16, 31, 46, 61],
        [2, 17, 32, 47, 62],
        [3, 18, 33, 48, 63],
        [4, 19, 34, 49, 64],
        [5, 20, 35, 50, 65]
      ]
    },
    {
      id: "012346",
      numbers: [
        [6, 16, 36, 40, 64],
        [8, 15, 35, 49, 66],
        [4, 14, 34, 48, 62],
        [3, 12, 32, 47, 65],
        [8, 21, 31, 54, 69]
      ]
    },
  ];

  const handleLoadExample = () => {
    setTickets(exampleTicket);
  };

  const handleDownloadExample = () => {
    const dataStr = JSON.stringify(exampleTicket, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataUri);
    downloadAnchorNode.setAttribute('download', 'example-teleloto-ticket.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="mb-6 bg-dark-800 rounded-lg shadow-xl p-4 border border-dark-700">
      <h2 className="text-xl font-bold mb-3 text-dark-50">Pavyzdinis bilietas</h2>
      <p className="text-dark-300 mb-3">
        Neturite bilietų JSON formatu? Išbandykite aplikaciją naudodami pavyzdinį failą.
      </p>
      <div className="flex space-x-3">
        <button
          onClick={handleLoadExample}
          className="px-4 py-2 bg-accent-600 text-dark-50 rounded-md hover:bg-accent-700 transition-colors"
        >
          Užkrauti Pavyzdį
        </button>
        <button
          onClick={handleDownloadExample}
          className="px-4 py-2 bg-dark-700 text-dark-200 rounded-md hover:bg-dark-600 transition-colors flex items-center"
        >
          <Download className="w-4 h-4 mr-1" />
          Atsisiųsti Pavyzdį
        </button>
      </div>
    </div>
  );
};

export default ExampleTicket;