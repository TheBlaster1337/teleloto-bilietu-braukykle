import React from 'react';
import { useTickets } from '../context/TicketContext';

const CrossedNumbersList: React.FC = () => {
  const { crossNumber, isCrossed, undoLastCrossedNumber, crossedNumbers, tickets } = useTickets();

  const sortedNumbers = [...crossedNumbers].sort((a, b) => b.timestamp - a.timestamp);
  const countTicketsWithNumber = (num: number) => {
    return tickets.reduce((acc, ticket) => {
      if (ticket.numbers && ticket.numbers.flat().includes(num)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };
  if (sortedNumbers.length === 0) {
    return (
      <div className="p-4 bg-dark-800 rounded-lg shadow-xl border border-dark-700">
        <h2 className="text-xl font-bold mb-4 text-dark-50">Pažymėti skaičiai</h2>
        <p className="text-dark-400">Nėra.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-dark-800 rounded-lg shadow-xl border border-dark-700">
      <h2 className="text-xl font-bold mb-4 text-dark-50">Pažymėti skaičiai</h2>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-dark-900">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-dark-300">Skaičius</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-dark-300">Laikas</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-dark-300">Bilietai su skaičiumi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {sortedNumbers.map((crossed, index) => (
              <tr key={index} className="hover:bg-dark-700">
                <td className="px-4 py-3 text-dark-200 font-medium">
                  {crossed.number < 10 ? `0${crossed.number}` : crossed.number}
                </td>
                <td className="px-4 py-3 text-dark-400 text-sm">
                  {new Date(crossed.timestamp).toLocaleTimeString("lt-LT")}
                </td>
                <td className="px-4 py-3 text-dark-400 text-sm">
                  {countTicketsWithNumber(crossed.number)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrossedNumbersList;