import React, { createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';

export interface Setting {
  winningPoints: number;
}

interface ISettingsContext {
  settings: Setting;
  setSettings: (setting: Setting) => void;
}

const SettingsContext = createContext<ISettingsContext>({} as ISettingsContext);

const defaultSettings: Setting = {
  winningPoints: 100,
};

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage<Setting>('settings', defaultSettings);

  const handleChangeSettings = (newSetting: Setting) => setSettings(newSetting);

  return (
    <SettingsContext.Provider
      value={{ settings: settings || defaultSettings, setSettings: handleChangeSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default function useSettings(): ISettingsContext {
  const settingsContext = useContext(SettingsContext);

  if (!settingsContext) {
    throw new Error('Invalid settings context');
  }

  return settingsContext;
}
