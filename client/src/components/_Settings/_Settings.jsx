import React, { useState, useContext } from 'react';

import SharingStats from './_SharingStats/_SharingStats.jsx';
import Themes from './_Themes/_Themes.jsx';
import Account from './_Account/_Account.jsx';
import {
  SettingsDiv,
  ButtonDiv,
  SettingsButton,
  MainMenuButton,
  BackButton
} from './Settings/SettingsStyledComponents.js';
import _SettingsContextProvider from './_SettingsContext.js';

export default function _Settings() {
  const [mainMenuIsOpen, setMainMenuIsOpen] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [themesAreOpen, setThemesAreOpen] = useState(false);

  const { shareStats, openThemes, viewAccount, backToSettings, goBack } = useContext(_SettingsContextProvider);

  return (
    <SettingsDiv>
      <h1>⚙️-Settings-⚙️</h1>
      <ButtonDiv>
        {
          mainMenuIsOpen
          ?
          <>
            <SettingsButton onClick={shareStats}>
              Share
            </SettingsButton>
            <SettingsButton onClick={openThemes}>
              Themes
            </SettingsButton>
            <SettingsButton onClick={viewAccount} style={{marginBottom: '4%'}}>
              Account
            </SettingsButton>
          </>
          :
          (
            isSharing
            ?
            (
              <>
                <SharingStats />
                <BackButton onClick={backToSettings}>
                  Settings
                </BackButton>
              </>
            )
            :
            (
              themesAreOpen
              ?
              (
                <>
                  <Themes />
                  <BackButton onClick={backToSettings}>
                    Settings
                  </BackButton>
                </>
              )
              :
              (
                <>
                  <Account />
                  <BackButton onClick={backToSettings}>
                    Settings
                  </BackButton>
                </>
              )
            )
          )
        }
      </ButtonDiv>
      <MainMenuButton onClick={goBack}>
        Main Menu
      </MainMenuButton>
    </SettingsDiv>
  );
};
