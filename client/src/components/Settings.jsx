import React from 'react';

import SharingStats from './SharingStats.jsx';
import Themes from './Themes.jsx';
import Account from './_Account/_Account.jsx';
import {
  SettingsDiv,
  ButtonDiv,
  SettingsButton,
  MainMenuButton,
  BackButton
} from './Settings/SettingsStyledComponents.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenuIsOpen: true,
      isSharing: false,
      themesAreOpen: false,
    };
    this.shareStats = this.shareStats.bind(this);
    this.openThemes = this.openThemes.bind(this);
    this.viewAccount = this.viewAccount.bind(this);
    this.goBack = this.goBack.bind(this);
    this.backToSettings = this.backToSettings.bind(this);
  }

  shareStats() {
    this.setState({
      mainMenuIsOpen: false,
      isSharing: true,
    });
  }

  openThemes() {
    this.setState({
      mainMenuIsOpen: false,
      themesAreOpen: true,
    });
  }

  viewAccount() {
    this.setState({
      mainMenuIsOpen: false,
    });
  }

  goBack() {
    this.setState({
      mainMenuIsOpen: true,
      isSharing: false,
      themesAreOpen: false,
    })
    this.props.goBack();
  }

  backToSettings() {
    this.setState({
      mainMenuIsOpen: true,
      isSharing: false,
      themesAreOpen: false,
    });
  }

  render() {
    return (
      <SettingsDiv>
        <h1>⚙️-Settings-⚙️</h1>
        <ButtonDiv>
          {
            this.state.mainMenuIsOpen
            ?
            <>
              <SettingsButton onClick={this.shareStats}>
                Share
              </SettingsButton>
              <SettingsButton onClick={this.openThemes}>
                Themes
              </SettingsButton>
              <SettingsButton onClick={this.viewAccount} style={{marginBottom: '4%'}}>
                Account
              </SettingsButton>
            </>
            :
            (
              this.state.isSharing
              ?
              (
                <>
                  <SharingStats />
                  <BackButton onClick={this.backToSettings}>
                    Settings
                  </BackButton>
                </>
              )
              :
              (
                this.state.themesAreOpen
                ?
                (
                  <>
                    <Themes />
                    <BackButton onClick={this.backToSettings}>
                      Settings
                    </BackButton>
                  </>
                )
                :
                (
                  <>
                    <Account />
                    <BackButton onClick={this.backToSettings}>
                      Settings
                    </BackButton>
                  </>
                )
              )
            )
          }
        </ButtonDiv>
        <MainMenuButton onClick={this.goBack}>
          Main Menu
        </MainMenuButton>
      </SettingsDiv>
    );
  }
}

export default Settings;