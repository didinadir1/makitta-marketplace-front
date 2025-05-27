import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppMode = 'normal' | 'restaurant';

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void; // Added setMode function
  toggleMode: () => void;
  isRestaurantMode: () => boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize mode based on a default or stored value (e.g., from local storage)
  // For now, default to 'normal' or 'restaurant' based on initial route or other logic
  const [mode, setMode] = useState<AppMode>('normal'); // Default to 'normal'

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'normal' ? 'restaurant' : 'normal'));
  };

  const isRestaurantMode = () => mode === 'restaurant';

  return (
    <AppModeContext.Provider value={{ mode, setMode, toggleMode, isRestaurantMode }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
};
