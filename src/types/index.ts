export interface Ticket {
  id: string;
  numbers: number[][];
  crossedNumbers?: number[];
}

export interface CrossedNumber {
  number: number;
  timestamp: number;
}

export interface Settings {
  enableTicketInteraction: boolean;
  highlightWinningCombinations: boolean;
  enableSoundEffects: boolean;
  darkMode: boolean;
}

export interface WinningCombination {
  type: 'corners' | 'horizontal' | 'x' | 'jackpot';
  ticketId: string;
  lineIndex?: number; // Only for horizontal
}