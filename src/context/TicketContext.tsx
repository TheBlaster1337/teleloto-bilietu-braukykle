import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, CrossedNumber, Settings, WinningCombination } from '../types';
import { checkWinningCombinations } from '../utils/winningCombinations';

interface TicketContextType {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  crossedNumbers: CrossedNumber[];
  setCrossedNumbers: React.Dispatch<React.SetStateAction<CrossedNumber[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  winningCombinations: WinningCombination[];
  crossNumber: (num: number) => void;
  isCrossed: (num: number) => boolean;
  undoLastCrossedNumber: () => void; // <-- add this
}

const defaultSettings: Settings = {
  enableTicketInteraction: true,
  highlightWinningCombinations: true,
  enableSoundEffects: false,
  darkMode: false,
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);
export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.5;
  audio.play();
};
export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [crossedNumbers, setCrossedNumbers] = useState<CrossedNumber[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [winningCombinations, setWinningCombinations] = useState<WinningCombination[]>([]);
  const undoLastCrossedNumber = () => {
    setCrossedNumbers(prev => prev.slice(0, -1));
  };
  // Check for winning combinations whenever crossed numbers change
  useEffect(() => {
    if (tickets.length > 0) {
      const combinations = checkWinningCombinations(tickets, crossedNumbers);
      setWinningCombinations(combinations);
    }
  }, [tickets, crossedNumbers]);

  const crossNumber = (num: number) => {
    if (isCrossed(num)) return;

    setCrossedNumbers(prev => [
      ...prev,
      { number: num, timestamp: Date.now() }
    ]);
    if (settings.enableSoundEffects) {
      playSound('/sounds/cross.mp3');
    }
  };
  useEffect(() => {
    if (tickets.length > 0) {
      const combinations = checkWinningCombinations(tickets, crossedNumbers);
      // Detect new jackpot
      const prevJackpots = winningCombinations.filter(c => c.type === 'jackpot').map(c => c.ticketId);
      const newJackpot = combinations.find(c => c.type === 'jackpot' && !prevJackpots.includes(c.ticketId));
      if (newJackpot && settings.enableSoundEffects) {
        playSound('/sounds/win.mp3');
      }
      setWinningCombinations(combinations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, crossedNumbers]);

  const isCrossed = (num: number) => {
    // Format single digit numbers with leading zero for comparison
    const formattedNum = num < 10 ? num : num;
    return crossedNumbers.some(crossed => crossed.number === formattedNum);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        setTickets,
        crossedNumbers,
        setCrossedNumbers,
        settings,
        setSettings,
        winningCombinations,
        crossNumber,
        isCrossed,
        undoLastCrossedNumber, // <-- add this
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};