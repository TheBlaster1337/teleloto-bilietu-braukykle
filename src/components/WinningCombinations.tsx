import React from 'react';
import { useTickets } from '../context/TicketContext';
import { Award, CheckSquare, Trophy } from 'lucide-react';
import FireworksEffect from './FireworksEffect';

const WinningCombinations: React.FC = () => {
  const { winningCombinations, tickets } = useTickets();
  const [showFireworks, setShowFireworks] = React.useState(false);
  const [congratsTicket, setCongratsTicket] = React.useState<string | null>(null);
  const prevJackpotsRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    const jackpots = winningCombinations.filter(c => c.type === 'jackpot').map(c => c.ticketId);
    const prevJackpots = prevJackpotsRef.current;
    const newJackpot = jackpots.find(id => !prevJackpots.includes(id));
    if (newJackpot) {
      setShowFireworks(true);
      setCongratsTicket(null);
      setTimeout(() => {
        setShowFireworks(false);
        setTimeout(() => {
          setCongratsTicket(newJackpot);
        }, 0); // short delay after fireworks
      }, 0); // fireworks duration
    }
    prevJackpotsRef.current = jackpots;
  }, [winningCombinations]);


  if (winningCombinations.length === 0) {
    // Count unique ticket IDs with a win
    const uniqueWinningTickets = new Set(winningCombinations.map(c => c.ticketId));
    return (
      <div className="p-4 bg-dark-800 rounded-lg shadow-xl border border-dark-700">
        <h2 className="text-xl font-bold mb-4 text-dark-50 flex items-center">
          <Award className="w-6 h-6 mr-2 text-yellow-500" />
          Laimingi bilietai
        </h2>
        <p className="text-dark-400">Nėra.</p>
      </div>
    );
  }

  const combinationsByTicket: Record<string, string[]> = {};
  const { crossedNumbers } = useTickets();
  winningCombinations.forEach(combo => {
    if (!combinationsByTicket[combo.ticketId]) {
      combinationsByTicket[combo.ticketId] = [];
    }

    let description = '';
    switch (combo.type) {
      case 'jackpot':
        description = '🎉 VISA LENTELĖ 🎉';
        break;
      case 'corners':
        description = 'Kampai';
        break;
      case 'horizontal':
        description = 'Eilutė';
        break;
      case 'x':
        description = 'Įstrižainės';
        break;
    }

    combinationsByTicket[combo.ticketId].push(description);
  });

  const getTicketLabel = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    return ticket ? `Bilietas: ${ticket.id}` : `Bilietas: ${ticketId}`;
  };
  const uniqueWinningTickets = new Set(winningCombinations.map(c => c.ticketId));

  return (
    <div className="relative">
      <div className="p-4 bg-dark-800 rounded-lg shadow-xl border border-dark-700">
        <h2 className="text-xl font-bold mb-4 text-dark-50 flex items-center">
          <Award className="w-6 h-6 mr-2 text-yellow-500" />
          Laimingi bilietai ({uniqueWinningTickets.size})
        </h2>

        <div className="space-y-3">
          {Object.entries(combinationsByTicket)
            // Sort by percentage of crossed numbers (descending)
            .map(([ticketId, combinations]) => {
              const ticket = tickets.find(t => t.id === ticketId);
              let percent = 0;
              if (ticket && ticket.numbers && ticket.numbers.length > 0) {
                const allNumbers = ticket.numbers.flat();
                const crossedNumbersSet = new Set(
                  crossedNumbers.map(cn => cn.number)
                );
                const crossedCount = allNumbers.filter(n => crossedNumbersSet.has(n)).length;
                percent = allNumbers.length > 0 ? Math.round((crossedCount / allNumbers.length) * 100) : 0;
              } else {
                percent = 0;
              }
              return { ticketId, combinations, percent };
            })
            .sort((a, b) => b.percent - a.percent)
            .map(({ ticketId, combinations, percent }) => {
              const hasJackpot = combinations.some(c => c.includes('JACKPOT'));
              const hasVisaLentele = combinations.includes('🎉 VISA LENTELĖ 🎉');
              return (
                <div
                  key={ticketId}
                  className={`p-3 border rounded-md transition-all duration-300
        ${hasVisaLentele
                      ? 'border-4 border-yellow-400 bg-gradient-to-r from-yellow-100/30 via-yellow-300/10 to-yellow-100/30 shadow-xl scale-[1.03] animate-pulse'
                      : hasJackpot
                        ? 'border-yellow-500/50 bg-yellow-500/10'
                        : 'border-accent-900/50 bg-accent-900/10'
                    }`}
                >
                  <h3 className={`font-medium mb-2 ${hasVisaLentele ? 'text-yellow-400 text-2xl font-bold drop-shadow-lg'
                      : hasJackpot ? 'text-yellow-200'
                        : 'text-accent-200'
                    }`}>
                    {getTicketLabel(ticketId)}
                    <span className="ml-2 text-sm font-normal text-dark-300">
                      ({percent}% užbraukta)
                    </span>
                  </h3>
                  <ul className="space-y-1">
                    {combinations.map((combination, index) => (
                      <li key={index} className={`flex items-center ${combination === '🎉 VISA LENTELĖ 🎉'
                          ? 'text-yellow-400 text-lg font-bold animate-bounce'
                          : combination.includes('JACKPOT')
                            ? 'text-yellow-300 text-lg font-bold'
                            : 'text-accent-300'
                        }`}>
                        {combination === '🎉 VISA LENTELĖ 🎉'
                          ? <Trophy className="w-6 h-6 mr-2 text-yellow-400 animate-spin-slow" />
                          : combination.includes('JACKPOT')
                            ? <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                            : <CheckSquare className="w-4 h-4 mr-2" />
                        }
                        <span>{combination}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WinningCombinations;