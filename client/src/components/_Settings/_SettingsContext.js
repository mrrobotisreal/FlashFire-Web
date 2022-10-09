import React, { createContext, useState, useContext } from 'react';
import _MainMenuContextProvider from '../_MainMenu/_MainMenuContext.js';

export const _SettingsContext = createContext(null);

export function _SettingsContextProvider({ children }) {
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [themesAreOpen, setThemesAreOpen] = useState(false);

  const { goBack } = useContext(_MainMenuContextProvider);

  const shareStats = () => {
    setMainMenuIsOpen(false);
    setIsSharing(true);
  };

  const openThemes = () => {
    setMainMenuIsOpen(false);
    setThemesAreOpen(true);
  };

  const viewAccount = () => {
    setMainMenuIsOpen(false);
  };

  const goBack = () => {
    this.props.goBack();
    setMainMenuIsOpen(true);
    setIsSharing(false);
    setThemesAreOpen(false);
  };

  const backToSettings = () => {
    setMainMenuIsOpen(true);
    setIsSharing(false);
    setThemesAreOpen(false);
  };

  const values = {
    mainMenuIsOpen,
    setMainMenuIsOpen,
    isSharing,
    setIsSharing,
    themesAreOpen,
    setThemesAreOpen,
    shareStats,
    openThemes,
    viewAccount,
    goBack,
    backToSettings
  };

  return (
    <_SettingsContext.Provider value={value}>{ children }</_SettingsContext.Provider>
  );
};