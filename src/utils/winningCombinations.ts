import { Ticket, CrossedNumber, WinningCombination } from '../types';

export const formatNumber = (num: number): number => {
  return num;
};

export const checkWinningCombinations = (
  tickets: Ticket[],
  crossedNumbers: CrossedNumber[]
): WinningCombination[] => {
  const combinations: WinningCombination[] = [];
  const crossedSet = new Set(crossedNumbers.map(cn => cn.number));

  tickets.forEach(ticket => {
    // Check corners
    const rows = ticket.numbers.length;
    const cols = ticket.numbers[0].length;
    const corners = [
      ticket.numbers[0][0],
      ticket.numbers[0][cols - 1],
      ticket.numbers[rows - 1][0],
      ticket.numbers[rows - 1][cols - 1]
    ];
    
    const allCornersMatched = corners.every(num => {
      const formattedNum = num < 10 ? num : num;
      return crossedSet.has(formattedNum);
    });

    if (allCornersMatched) {
      combinations.push({
        type: 'corners',
        ticketId: ticket.id
      });
    }

    // Check only third row for horizontal line
    const thirdRow = ticket.numbers[2];
    const thirdRowMatched = thirdRow.every(num => {
      const formattedNum = num < 10 ? num : num;
      return crossedSet.has(formattedNum);
    });

    if (thirdRowMatched) {
      combinations.push({
        type: 'horizontal',
        ticketId: ticket.id,
        lineIndex: 2
      });
    }

    // Check X pattern
    const leftDiagonal = [];
    const rightDiagonal = [];

    for (let i = 0; i < rows; i++) {
      leftDiagonal.push(ticket.numbers[i][i]);
      rightDiagonal.push(ticket.numbers[i][cols - 1 - i]);
    }

    const allLeftDiagonalMatched = leftDiagonal.every(num => {
      const formattedNum = num < 10 ? num : num;
      return crossedSet.has(formattedNum);
    });

    const allRightDiagonalMatched = rightDiagonal.every(num => {
      const formattedNum = num < 10 ? num : num;
      return crossedSet.has(formattedNum);
    });

    if (allLeftDiagonalMatched && allRightDiagonalMatched) {
      combinations.push({
        type: 'x',
        ticketId: ticket.id
      });
    }

    // Check for jackpot (all numbers crossed)
    const allNumbersCrossed = ticket.numbers.every(row =>
      row.every(num => {
        const formattedNum = num < 10 ? num : num;
        return crossedSet.has(formattedNum);
      })
    );

    if (allNumbersCrossed) {
      combinations.push({
        type: 'jackpot',
        ticketId: ticket.id
      });
    }
  });

  return combinations;
};