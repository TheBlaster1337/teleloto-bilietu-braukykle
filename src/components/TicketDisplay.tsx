import React from 'react';
import { useTickets } from '../context/TicketContext';
import { Ticket } from '../types';

const TicketDisplay: React.FC = () => {
  const { tickets, crossNumber, isCrossed, settings, winningCombinations } = useTickets();

  const handleNumberClick = (num: number) => {
    if (settings.enableTicketInteraction) {
      crossNumber(num);
    }
  };

  const isPartOfWinningCombination = (ticket: Ticket, rowIndex: number, colIndex: number): string | null => {
    if (!settings.highlightWinningCombinations) return null;
    
    const rows = ticket.numbers.length;
    const cols = ticket.numbers[0].length;
    
    const ticketWinnings = winningCombinations.filter(combo => combo.ticketId === ticket.id);
    
    for (const combo of ticketWinnings) {
      if (combo.type === 'jackpot') {
        return 'jackpot';
      }
      
      if (combo.type === 'corners') {
        if (
          (rowIndex === 0 && colIndex === 0) || 
          (rowIndex === 0 && colIndex === cols - 1) ||
          (rowIndex === rows - 1 && colIndex === 0) ||
          (rowIndex === rows - 1 && colIndex === cols - 1)
        ) {
          return 'corners';
        }
      }
      
      if (combo.type === 'horizontal' && rowIndex === 2) {
        return 'horizontal';
      }
      
      if (combo.type === 'x') {
        if (rowIndex === colIndex || rowIndex === cols - 1 - colIndex) {
          return 'x';
        }
      }
    }
    
    return null;
  };

  if (tickets.length === 0) {
    // return (
    //   <div className="bg-dark-800 rounded-lg p-6 text-center border border-dark-700">
    //     <p className="text-dark-400">Nėra bilietų. Įkelkite JSON failą.</p>
    //   </div>
    // );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {tickets.map((ticket) => {
        const isJackpotWinner = winningCombinations.some(
          combo => combo.ticketId === ticket.id && combo.type === 'jackpot'
        );
        
        return (
          <div 
            key={ticket.id} 
            className={`bg-dark-800 rounded-lg shadow-xl overflow-hidden border ${
              isJackpotWinner ? 'border-yellow-500' : 'border-dark-700'
            }`}
          >
            <div className={`${
              isJackpotWinner ? 'bg-yellow-900' : 'bg-accent-900'
            } text-dark-50 py-3 px-4`}>
<h3 className="text-lg font-bold flex items-center justify-between">
  <span>
    Bilietas: {ticket.id}
    {/* Percentage of crossed numbers */}
    <span className="ml-2 text-sm font-normal text-dark-300">
      (
        {(() => {
          const allNumbers = ticket.numbers.flat();
          const crossedCount = allNumbers.filter(isCrossed).length;
          const percent = Math.round((crossedCount / allNumbers.length) * 100);
          if (percent === 100) return '100% SVEIKINAME!';
          return `${percent}% užbraukta`;
        })()}
      )
    </span>
  </span>
  {isJackpotWinner && (
    <span className="text-yellow-300">🏆 LAIMĖTOJAS!</span>
  )}
</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-5 gap-2">
                {ticket.numbers.map((row, rowIndex) => (
                  <React.Fragment key={`row-${rowIndex}`}>
                    {row.map((num, colIndex) => {
                      const crossed = isCrossed(num);
                      const winningType = isPartOfWinningCombination(ticket, rowIndex, colIndex);
                      
                      let borderColor = 'border-dark-600';
                      let bgColor = crossed ? 'bg-red-900/20' : 'bg-dark-900';
                      let textColor = crossed ? 'text-red-400' : 'text-dark-200';
                      
                      if (winningType && crossed) {
                        switch (winningType) {
                          case 'jackpot':
                            borderColor = 'border-yellow-500';
                            bgColor = 'bg-yellow-900/20';
                            textColor = 'text-yellow-400';
                            break;
                          case 'corners':
                            borderColor = 'border-green-700';
                            bgColor = 'bg-green-900/20';
                            textColor = 'text-green-400';
                            break;
                          case 'horizontal':
                            borderColor = 'border-accent-700';
                            bgColor = 'bg-accent-900/20';
                            textColor = 'text-accent-400';
                            break;
                          case 'x':
                            borderColor = 'border-purple-700';
                            bgColor = 'bg-purple-900/20';
                            textColor = 'text-purple-400';
                            break;
                        }
                      }
                      
                      return (
                        <div
                          key={`cell-${rowIndex}-${colIndex}`}
                          className={`w-12 h-12 flex items-center justify-center border ${borderColor} rounded-md ${bgColor} ${
                            settings.enableTicketInteraction && !crossed ? 'hover:bg-dark-700 cursor-pointer' : ''
                          } transition-colors duration-200`}
                          onClick={() => handleNumberClick(num)}
                        >
                          <span className={`font-medium ${textColor} ${crossed ? 'line-through' : ''}`}>
                            {num < 10 ? `0${num}` : num}
                          </span>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketDisplay;