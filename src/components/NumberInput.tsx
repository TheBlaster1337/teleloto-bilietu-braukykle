import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { PlusCircle, Undo2 } from 'lucide-react';


const NumberInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { crossNumber, isCrossed, undoLastCrossedNumber, crossedNumbers } = useTickets();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const num = parseInt(inputValue.trim(), 10);
    if (isNaN(num)) {
      setError('Įveskite teisingą skaičių');
      return;
    }
    
    if (num < 1 || num > 90) {
      setError('Skaičius turi būti tarp 1 ir 90');
      return;
    }
    
    if (isCrossed(num)) {
      setError(`Skaičius ${num < 10 ? '0' + num : num} jau yra išbrauktas`);
      return;
    }
    
    crossNumber(num);
    setInputValue('');
  };

  return (
    <div className="mb-6 p-4 bg-dark-800 rounded-lg shadow-xl border border-dark-700">
      <h2 className="text-xl font-bold mb-4 text-dark-50">Skaičių žymėjimas</h2>
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="number-input" className="block text-sm font-medium text-dark-200 mb-1">
            Skaičius kurį norite pažymėti:
          </label>
          <input
            id="number-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Įveskite skaičių (1-90)"
            className="w-full px-3 py-2 bg-dark-900 border border-dark-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 text-dark-50 placeholder-dark-400"
          />
          {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-accent-600 text-dark-50 rounded-md hover:bg-accent-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-dark-800 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-1" />
          <span>Pažymėti</span>
        </button>
          <button
          type="button"
          onClick={undoLastCrossedNumber}
          disabled={crossedNumbers.length === 0}
          className={`px-4 py-2 ml-2 flex items-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-dark-800 ${
            crossedNumbers.length === 0
              ? 'bg-dark-700 text-dark-400 cursor-not-allowed'
              : 'bg-accent-900 text-accent-200 hover:bg-accent-800'
          }`}
        >
          <Undo2 className="w-5 h-5 mr-1" />
          Undo
        </button>
      </form>
    </div>
  );
};

export default NumberInput;