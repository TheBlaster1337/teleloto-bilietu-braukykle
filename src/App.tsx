import React from 'react';
import { TicketProvider } from './context/TicketContext';
import {
  FileUploader,
  TicketDisplay,
  NumberInput,
  CrossedNumbersList,
  WinningCombinations,
  Header,
  ExampleTicket
} from './components';

function App() {
  return (
    <TicketProvider>
      <div className="min-h-screen bg-dark-950 text-dark-50 ">
        {/* Floating Header */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Add top and bottom padding to main to avoid overlap */}
        <main className="container mx-auto px-4 py-8 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <ExampleTicket />
              <FileUploader />
              <TicketDisplay />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <NumberInput />
              <CrossedNumbersList />
              <WinningCombinations />
            </div>
          </div>
        </main>

        <footer className="bg-dark-900 py-4 border-t border-dark-800 w-full fixed bottom-0 left-0">
          <div className="container mx-auto px-4 text-center text-dark-400">
            TheBlaster1337 &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </TicketProvider>
  );
}

export default App;