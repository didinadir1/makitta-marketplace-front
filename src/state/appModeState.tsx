import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppMode = 'normal' | 'restaurant';

interface AppModeContextType {
  mode: AppMode;
  toggleMode: () => void;
  isRestaurantMode: () => boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AppMode>('normal');

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'normal' ? 'restaurant' : 'normal');
  };

  const isRestaurantMode = () => {
    return mode === 'restaurant';
  };

  return (
    <AppModeContext.Provider value={{ mode, toggleMode, isRestaurantMode }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = (): AppModeContextType => {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
};
