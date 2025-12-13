import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import { Settings, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const { settings, setSettings } = useTickets();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-800/50 hover:bg-dark-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5 text-dark-200" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-dark-800 rounded-lg shadow-xl p-4 z-10 border border-dark-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-dark-50">Nustatymai</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-dark-400 hover:text-dark-200"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-dark-200">Bilietų sąveika</span>
              </div>
              <button
                onClick={() => toggleSetting('enableTicketInteraction')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableTicketInteraction ? 'bg-accent-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-dark-50 transition-transform ${
                    settings.enableTicketInteraction ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-dark-200">Pažymėti laimėtojus</span>
              </div>
              <button
                onClick={() => toggleSetting('highlightWinningCombinations')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.highlightWinningCombinations ? 'bg-accent-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-dark-50 transition-transform ${
                    settings.highlightWinningCombinations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-dark-200">Garso efektai</span>
                {settings.enableSoundEffects ? 
                  <Volume2 className="ml-1 w-4 h-4 text-dark-400" /> : 
                  <VolumeX className="ml-1 w-4 h-4 text-dark-400" />
                }
              </div>
              <button
                onClick={() => toggleSetting('enableSoundEffects')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableSoundEffects ? 'bg-accent-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-dark-50 transition-transform ${
                    settings.enableSoundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-dark-200">Tamsusis režimas</span>
                {settings.darkMode ? 
                  <Moon className="ml-1 w-4 h-4 text-dark-400" /> : 
                  <Sun className="ml-1 w-4 h-4 text-dark-400" />
                }
              </div>
              <button
                onClick={() => toggleSetting('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-accent-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-dark-50 transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;